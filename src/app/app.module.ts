import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { MaterialModule } from './shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './shared/components/homepage/homepage.component';
import { NewsDetailComponent } from './shared/components/news-detail/news-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { NewsCategoryComponent } from './shared/components/news-category/news-category.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomepageComponent,
    NewsDetailComponent,
    LoginFormComponent,
    PageNotFoundComponent,
    NewsCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
