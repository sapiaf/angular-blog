import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { UsersService } from '../../admin/modules/users/services/users.service';
import { User } from '../models/user';
import { map } from 'rxjs';

export function UniqueUsernameValidator(
  usersService: UsersService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return usersService.getAll().pipe(
      map((users: any[]) => {
        const user = users.find((u) => u.username === control.value);
        return user ? { uniqueUsername: true } : null;
      })
    );
  };
}
