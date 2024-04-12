import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { UniqueUsernameValidator } from '../../../../../core/validators/validators';
import { AuthService } from '../../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss',
})
export class UsersFormComponent implements OnInit, OnDestroy {
  usersForm!: FormGroup;
  userId!: string | null;
  isProfile = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UsersService,
    public dialogRef: MatDialogRef<UsersFormComponent>,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('isProfile');
  }

  ngOnInit(): void {
    this.buildForm();
    this.userId = localStorage.getItem('userId');

    console.log(this.userId);

    if (this.userId) {
      this.userService.getById(this.userId).subscribe({
        next: (user) => {
          this.usersForm.patchValue(user);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }

    this.isProfile = localStorage.getItem('isProfile') === 'true';
  }

  buildForm(): void {
    this.usersForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(6)]],
      lastName: ['', [Validators.required, Validators.minLength(6)]],
      username: [
        '',
        [Validators.required, Validators.minLength(6)],
        [UniqueUsernameValidator(this.userService)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      penName: [''],
      role: [''],
    });
  }

  onSubmit(): void {
    if (this.userId) {
      this.userService.update(this.userId, this.usersForm.value).subscribe({
        next: () => {
          this.snackBar.open('User updated successfully', 'Close', {
            duration: 2000,
          });
          this.authService.userLogged$.next(this.usersForm.value);
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.userService.create(this.usersForm.value).subscribe({
        next: () => {
          this.snackBar.open('User created successfully', 'Close', {
            duration: 2000,
          });
          this.authService.userLogged$.next(this.usersForm.value);
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
