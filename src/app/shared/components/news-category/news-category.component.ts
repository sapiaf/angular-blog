import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from '../../../admin/modules/news/services/news.service';
import { News } from '../../../core/models/news';
import { createSlug } from '../../../core/functions/util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrl: './news-category.component.scss',
})
export class NewsCategoryComponent implements OnInit {
  news$!: Observable<News[]>;
  createSlug = createSlug;
  categoryId!: string;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.news$ = this.newsService.getMostRecentNewsByCategory(this.categoryId);
  }
}
