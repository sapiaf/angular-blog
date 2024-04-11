import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class CRUDService<T> {
  protected abstract apiUrl: string;

  constructor(public http: HttpClient) {}
  getAll(): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.apiUrl).pipe(map((data) => data));
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`).pipe(map((data) => data));
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item).pipe(map((data) => data));
  }

  update(id: string, item: Partial<T>): Observable<T> {
    return this.http
      .patch<T>(`${this.apiUrl}/${id}`, item)
      .pipe(map((data) => data));
  }

  delete(id: string): Observable<T> {
    return this.http
      .delete<T>(`${this.apiUrl}/${id}`)
      .pipe(map((data) => data));
  }
}
