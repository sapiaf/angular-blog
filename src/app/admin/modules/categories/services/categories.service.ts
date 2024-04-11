import { Injectable } from '@angular/core';
import { CRUDService } from '../../../services/crud.service';
import { Category } from '../../../../core/models/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends CRUDService<Category> {
  protected override apiUrl: string;
  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = 'http://localhost:3000/categories';
  }
}
