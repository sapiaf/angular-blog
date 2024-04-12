import { Component, OnInit, ViewChild } from '@angular/core';
import { News } from '../../../core/models/news';
import { Category } from '../../../core/models/category';
import { NewsService } from '../../../admin/modules/news/services/news.service';
import { CategoriesService } from '../../../admin/modules/categories/services/categories.service';
import { createSlug } from '../../../core/functions/util';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  news$!: News[];
  categories$!: Category[];
  newsByCategory: { [key: string]: News[] } = {};
  createSlug = createSlug;

  constructor(
    private newsService: NewsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.newsService
      .getMostRecentNews()
      .subscribe((news) => (this.news$ = news));

    this.categoriesService.getAll().subscribe((categories) => {
      this.categories$ = categories;
      for (let category of this.categories$) {
        this.newsByCategory[category.id] = [];
        this.newsService
          .getMostRecentNewsByCategory(category.id)
          .subscribe((news) => {
            this.newsByCategory[category.id] = news;
          });
      }
    });
  }
}
