import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsFormComponent } from './components/news-form/news-form.component';
import { adminGuard } from '../../../core/auth/guards/admin.guard';
import { editorGuard } from '../../../core/auth/guards/editor.guard';

const routes: Routes = [
  { path: '', component: NewsListComponent, canActivate: [adminGuard] },
  { path: 'form', component: NewsFormComponent, canActivate: [editorGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
