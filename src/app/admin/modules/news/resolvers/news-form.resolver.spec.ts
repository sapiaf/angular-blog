import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { newsFormResolver } from './news-form.resolver';

describe('newsFormResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => newsFormResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
