import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/components/homepage/homepage.component';
import { NewsDetailComponent } from './pages/components/news-detail/news-detail.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
