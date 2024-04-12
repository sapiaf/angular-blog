import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../modules/users/services/users.service';
import { User } from '../../../core/models/user';
import { AuthService } from '../../../core/auth/services/auth.service';
import { News } from '../../../core/models/news';
import { NewsService } from '../../modules/news/services/news.service';
import { MatDialog } from '@angular/material/dialog';
import { UsersFormComponent } from '../../modules/users/components/users-form/users-form.component';
import { Router } from '@angular/router';
import { createSlug } from '../../../core/functions/util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  news: News[] = [];
  createSlug = createSlug;

  constructor(
    private authService: AuthService,
    private newsService: NewsService,
    public dialog: MatDialog,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.authService.userLogged$.subscribe((user) => {
      this.currentUser = user;
    });

    this.newsService.getNewsByUser(this.currentUser?.id ?? '').subscribe({
      next: (news) => {
        this.news = news;
      },
      error: (error) => {
        console.error(error);
      },
    });

    localStorage.setItem('isProfile', 'true');
  }

  openDialog(id: string | undefined): void {
    localStorage.setItem('userId', this.currentUser?.id ?? '');
    this.dialog
      .open(UsersFormComponent, {
        width: '600px',
        data: { showRole: false },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            console.log('The dialog was closed');
            this.authService.userLogged$.subscribe((user) => {
              this.currentUser = user;
            });
          }
        },
      });
  }

  editNews(news: News): void {
    localStorage.setItem('newsId', news.id);
    this.router.navigate(['admin/news/form']);
  }
}
