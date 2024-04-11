import { Component, OnInit } from '@angular/core';
import { News } from '../../../../../core/models/news';
import { NewsService } from '../../services/news.service';
import { ListComponent } from '../../../../../shared/components/list/list.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
})
export class NewsListComponent extends ListComponent<News> {
  constructor(private newsService: NewsService, private router: Router) {
    super();
  }

  getService() {
    return {
      getAll: () => this.newsService.getAll(),
      delete: (id: string) => this.newsService.delete(id) as Observable<any>,
    };
  }

  editNews(news: News): void {
    localStorage.setItem('newsId', news.id);
    this.router.navigate(['admin/news/form']);
  }
}
