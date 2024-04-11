import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../core/models/user';
import { UsersService } from '../../services/users.service';
import { ListComponent } from '../../../../../shared/components/list/list.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent extends ListComponent<User> {
  constructor(private usersService: UsersService) {
    super();
  }

  getService() {
    return {
      getAll: () => this.usersService.getAll(),
      delete: (id: string) => this.usersService.delete(id) as Observable<any>,
    };
  }
}
