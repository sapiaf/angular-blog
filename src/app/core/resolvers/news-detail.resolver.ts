import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { NewsService } from '../../admin/modules/news/services/news.service';
import { EMPTY, catchError, mergeMap, of } from 'rxjs';
import { News } from '../models/news';

export const newsDetailResolver: ResolveFn<News> = (route, state) => {
  const router: Router = inject(Router);
  const newsService: NewsService = inject(NewsService);
  const id: string | null = route.paramMap.get('id');

  if (id) {
    return newsService.getById(id).pipe(
      mergeMap((student) => {
        if (student) {
          return of(student);
        } else {
          router.navigate(['/']);
          return EMPTY;
        }
      }),
      catchError((error) => {
        window.alert('Student not found');
        router.navigate(['/']);
        return EMPTY;
      })
    );
  } else {
    router.navigate(['/']);
    return EMPTY;
  }
};
