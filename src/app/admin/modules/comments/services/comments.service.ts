import { Injectable } from '@angular/core';
import { CRUDService } from '../../../services/crud.service';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../../../../core/models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService extends CRUDService<Comment> {
  protected override apiUrl: string;
  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = 'http://localhost:3000/comments';
  }
}
