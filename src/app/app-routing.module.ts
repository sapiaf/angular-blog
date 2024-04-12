import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './shared/components/homepage/homepage.component';
import { NewsDetailComponent } from './shared/components/news-detail/news-detail.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { newsDetailResolver } from './core/resolvers/news-detail.resolver';
import { NewsCategoryComponent } from './shared/components/news-category/news-category.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'news/:id/:title',
    component: NewsDetailComponent,
    resolve: { news: newsDetailResolver },
  },
  {
    path: 'news/category/:id',
    component: NewsCategoryComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'register',
    component: LoginFormComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
