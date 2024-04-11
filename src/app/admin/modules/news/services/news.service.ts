import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUDService } from '../../../services/crud.service';
import { News } from '../../../../core/models/news';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService extends CRUDService<News> {
  protected override apiUrl: string;
  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = 'http://localhost:3000/news';
  }

  getRecentNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}`).pipe(
      map((news) => {
        console.log(news.forEach((n) => console.log(n.updatedAt)));
        return news.sort((a, b) => {
          const updatedAtA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const updatedAtB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return updatedAtB - updatedAtA;
        });
      })
    );
  }

  getRecentNewsByCategory(categoryId: string): Observable<News[]> {
    return this.http
      .get<News[]>(`${this.apiUrl}?categoryId=${categoryId}`)
      .pipe(
        map((news) => {
          return news.sort((a, b) => {
            const updatedAtA = a.updatedAt
              ? new Date(a.updatedAt).getTime()
              : 0;
            const updatedAtB = b.updatedAt
              ? new Date(b.updatedAt).getTime()
              : 0;
            return updatedAtB - updatedAtA;
          });
        })
      );
  }
}
