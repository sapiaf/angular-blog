import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './components/news-list/news-list.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { NewsFormComponent } from './components/news-form/news-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewsListComponent, NewsFormComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class NewsModule {}
