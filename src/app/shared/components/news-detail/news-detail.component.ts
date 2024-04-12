import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from '../../../core/models/news';
import { NewsService } from '../../../admin/modules/news/services/news.service';
import { CommentsService } from '../../../admin/modules/comments/services/comments.service';
import { Comment } from '../../../core/models/comment';
import { CategoriesService } from '../../../admin/modules/categories/services/categories.service';
import { Category } from '../../../core/models/category';
import { UsersService } from '../../../admin/modules/users/services/users.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss',
})
export class NewsDetailComponent implements OnInit {
  id!: string;
  news!: News;
  comments$!: Comment[];
  newComment = '';
  category$!: Category;
  author$!: User;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private commentsService: CommentsService,
    private categoriesService: CategoriesService,
    private usersService: UsersService
  ) {}
  ngOnInit(): void {
    this.news = this.route.snapshot.data['news'];
    this.id = this.news.id;
    this.newsService.getById(this.id).subscribe((news) => (this.news = news));
    this.commentsService
      .getCommentsByNewsId(this.id)
      .subscribe((comments) => (this.comments$ = comments));
    this.categoriesService.getById(this.news.category).subscribe((category) => {
      this.category$ = category;
    });
    this.usersService.getById(this.news.author).subscribe((user) => {
      this.author$ = user;
    });
  }
}
