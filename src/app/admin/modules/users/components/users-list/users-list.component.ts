import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../core/models/user';
import { UsersService } from '../../services/users.service';
import { ListComponent } from '../../../../../shared/components/list/list.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UsersFormComponent } from '../users-form/users-form.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent extends ListComponent<User> {
  constructor(private usersService: UsersService, public dialog: MatDialog) {
    super();
  }

  getService() {
    return {
      getAll: () => this.usersService.getAll(),
      delete: (id: string) => this.usersService.delete(id) as Observable<any>,
    };
  }

  openDialog(id: string): void {
    localStorage.setItem('userId', id);
    this.dialog
      .open(UsersFormComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            console.log('The dialog was closed');
            this.usersService.getAll().subscribe({
              next: (users) => {
                this.items = users;
              },
            });
          }
        },
      });
  }
}
