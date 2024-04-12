import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { newsDetailResolver } from './news-detail.resolver';

describe('newsDetailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => newsDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
