import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoriesListComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class CategoriesModule {}
