import { Component } from '@angular/core';
import { Comment } from '../../../../../core/models/comment';
import { CommentsService } from '../../services/comments.service';
import { ListComponent } from '../../../../../shared/components/list/list.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.scss',
})
export class CommentsListComponent extends ListComponent<Comment> {
  constructor(private commentsService: CommentsService) {
    super();
  }

  getService() {
    return {
      getAll: () => this.commentsService.getAll(),
      delete: (id: string) =>
        this.commentsService.delete(id) as Observable<any>,
    };
  }
}
