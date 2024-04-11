import { Component, OnInit } from '@angular/core';
import { News } from '../../../core/models/news';
import { Category } from '../../../core/models/category';
import { NewsService } from '../../../admin/modules/news/services/news.service';
import { CategoriesService } from '../../../admin/modules/categories/services/categories.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  news$!: News[];
  categories$!: Category[];

  constructor(
    private newsService: NewsService,
    private categorisService: CategoriesService
  ) {}

  ngOnInit() {
    this.newsService.getAll().subscribe((news) => (this.news$ = news));
  }
}
