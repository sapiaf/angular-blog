import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { take } from 'rxjs';
import { News } from '../../../../../core/models/news';
import { Category } from '../../../../../core/models/category';
import { CategoriesService } from '../../../categories/services/categories.service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss',
})
export class NewsFormComponent implements OnInit, OnDestroy {
  newsId!: string | null;
  newsForm!: FormGroup;
  showForm: boolean = false;
  news!: News;
  categories!: Category[];

  constructor(
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private categoryService: CategoriesService
  ) {}

  ngOnDestroy(): void {
    localStorage.removeItem('newsId');
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.buildForm();
    this.newsId = localStorage.getItem('newsId');
    if (this.newsId) {
      this.newsService
        .getById(this.newsId)
        .pipe(take(1))
        .subscribe({
          next: (news) => {
            this.news = news;
            this.newsForm.patchValue(news);
            this.showForm = true;
          },
          error: (error) => {
            console.error(error);
          },
        });
    } else {
      this.showForm = true;
    }
  }

  buildForm(): void {
    this.newsForm = this.formBuilder.group({
      title: [''],
      author: ['John Doe'],
      content: [''],
      date: [Date.now()],
      category: [''],
      imageUrl: [''],
      createdAt: [Date.now()],
      updatedAt: [null],
      comments: [null],
    });
  }

  onSubmit(): void {
    if (this.newsForm.invalid) {
      return;
    }

    const news = this.newsForm.value;

    if (this.newsId) {
      this.newsService.update(this.newsId, news).subscribe({
        next: () => {
          this.snackBar.open('News updated successfully', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['admin/news']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.newsService.create(news).subscribe({
        next: () => {
          this.snackBar.open('News created successfully', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['admin/news']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
