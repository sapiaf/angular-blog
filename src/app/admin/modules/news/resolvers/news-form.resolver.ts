import { ResolveFn } from '@angular/router';

export const newsFormResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
