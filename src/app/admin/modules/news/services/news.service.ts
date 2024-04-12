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

  getMostRecentNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}`).pipe(
      map((news) => {
        return news.sort((a, b) => {
          const updatedAtA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const updatedAtB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          const createdAtA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const createdAtB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

          console.log(updatedAtA, updatedAtB, createdAtA, createdAtB);

          if (updatedAtB - updatedAtA === 0) {
            return createdAtB - createdAtA;
          } else {
            return updatedAtB - updatedAtA;
          }
        });
      })
    );
  }

  getMostRecentNewsByCategory(categoryId: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}`).pipe(
      map((news) => {
        return news
          .filter((n) => n.category === categoryId)
          .sort((a, b) => {
            const updatedAtA = a.updatedAt
              ? new Date(a.updatedAt).getTime()
              : 0;
            const updatedAtB = b.updatedAt
              ? new Date(b.updatedAt).getTime()
              : 0;
            const createdAtA = a.createdAt
              ? new Date(a.createdAt).getTime()
              : 0;
            const createdAtB = b.createdAt
              ? new Date(b.createdAt).getTime()
              : 0;

            if (updatedAtB - updatedAtA === 0) {
              return createdAtB - createdAtA;
            } else {
              return updatedAtB - updatedAtA;
            }
          });
      })
    );
  }

  getNewsByUser(userId: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}?author=${userId}`);
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
