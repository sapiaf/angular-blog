import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsFormComponent } from './components/news-form/news-form.component';

const routes: Routes = [
  { path: '', component: NewsListComponent },
  { path: 'form', component: NewsFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
