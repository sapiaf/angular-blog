import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../core/models/category';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  categoriesForm!: FormGroup;
  selectedCategory: Category | undefined;

  constructor(
    private categoryService: CategoriesService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.categoriesForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteCategory(id: string) {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.loadCategories();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editCategory(category: Category) {
    this.selectedCategory = category;
    this.categoriesForm.setValue({
      name: category.name,
    });
  }

  onSubmit(): void {
    if (!this.categoriesForm.valid) {
      this.snackBar.open('Form is not valid', 'Close', {
        duration: 2000,
      });
      return;
    }

    if (this.selectedCategory) {
      this.categoryService
        .update(this.selectedCategory.id, this.categoriesForm.value)
        .subscribe({
          next: () => {
            this.loadCategories();
            this.snackBar.open('Category updated', 'Close', {
              duration: 2000,
            });
          },
          error: (error) => {
            console.error(error);
          },
        });
    } else {
      this.categoryService.create(this.categoriesForm.value).subscribe({
        next: () => {
          this.loadCategories();
          this.snackBar.open('Category updated', 'Close', {
            duration: 2000,
          });
        },
        error: (error) => {
          console.error(error);
        },
      });

      this.categoriesForm.reset();
    }
  }
}
