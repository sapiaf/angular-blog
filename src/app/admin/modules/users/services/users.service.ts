import { Injectable } from '@angular/core';
import { CRUDService } from '../../../services/crud.service';
import { User } from '../../../../core/models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends CRUDService<User> {
  protected override apiUrl: string;
  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = 'http://localhost:3000/users';
  }
}
