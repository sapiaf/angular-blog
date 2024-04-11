import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { MaterialModule } from '../../../shared/material/material.module';

@NgModule({
  declarations: [CommentsListComponent],
  imports: [CommonModule, CommentsRoutingModule, MaterialModule],
})
export class CommentsModule {}
