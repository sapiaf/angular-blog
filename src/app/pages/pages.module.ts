import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [HomepageComponent, NewsDetailComponent],
  imports: [CommonModule, MaterialModule],
})
export class PagesModule {}
