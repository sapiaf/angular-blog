import { Injectable } from '@angular/core';
import { CRUDService } from '../../../services/crud.service';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../../../../core/models/comment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService extends CRUDService<Comment> {
  protected override apiUrl: string;
  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = 'http://localhost:3000/comments';
  }

  getCommentsByNewsId(newsId: string) {
    return this.http
      .get<Comment[]>(`${this.apiUrl}`)
      .pipe(
        map((comments: Comment[]) =>
          comments.filter((comment: Comment) => comment.newsId === newsId)
        )
      );
  }
}
