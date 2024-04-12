import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../../models/user';
import { UsersService } from '../../../admin/modules/users/services/users.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userLogged$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  constructor(private usersService: UsersService, private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.checkCredentials(username, password).pipe(
      map((user) => {
        if (user) {
          this.userLogged$.next(user);
          this.isLoggedIn$.next(true);

          return true;
        } else {
          this.userLogged$.next(null);
          this.isLoggedIn$.next(false);

          return false;
        }
      })
    );
  }

  checkCredentials(
    username: string,
    password: string
  ): Observable<User | null> {
    return this.usersService.getAll().pipe(
      map((users) => {
        const user = users.find((user) => user.username === username);
        if (user && user.password === password) {
          this.userLogged$.next(user);
          this.isLoggedIn$.next(true);

          return user;
        } else {
          this.userLogged$.next(null);
          this.isLoggedIn$.next(false);
          return null;
        }
      })
    );
  }

  isAdmin() {
    return this.userLogged$.value?.role === 0;
  }

  isEditor() {
    return this.userLogged$.value?.role === 2 || this.isAdmin();
  }

  logout(): void {
    this.userLogged$.next(null);
    this.isLoggedIn$.next(false);
  }
}
