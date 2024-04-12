import { Component, EventEmitter, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../admin/modules/users/services/users.service';
import { User } from '../../../core/models/user';
import { UniqueUsernameValidator } from '../../../core/validators/validators';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  active: string = 'login';
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private snackBars: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: [
        '',
        Validators.required,
        UniqueUsernameValidator(this.usersService),
      ],
      password: ['', Validators.required],
    });
  }

  onLoginTab(): void {
    this.active = 'login';
  }

  onRegisterTab(): void {
    this.active = 'register';
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe((success) => {
        if (success) {
          this.snackBars.open('Login effettuato', 'Chiudi', {
            duration: 2000,
          });
          this.router.navigate(['/admin/profile']);
        } else {
          this.snackBars.open('Credenziali non valide', 'Chiudi', {
            duration: 2000,
          });
        }
      });
    } else {
      this.snackBars.open('Credenziali non valide', 'Chiudi', {
        duration: 2000,
      });
    }
  }

  onSubmitRegister(): void {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      const { role, posts, comments, penName } = new User(
        this.registerForm.value
      );
      this.usersService
        .create({ role, posts, comments, penName, ...this.registerForm.value })
        .subscribe((user) => {
          console.log(user);
        });
      this.snackBars.open('Registrazione effettuata', 'Chiudi', {
        duration: 2000,
      });
      this.router.navigate(['/']);
    } else {
      this.snackBars.open('Credenziali non valide', 'Chiudi', {
        duration: 2000,
      });
    }
  }
}
