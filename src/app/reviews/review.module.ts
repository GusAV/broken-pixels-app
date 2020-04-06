import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ReviewComponent } from './review.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewService } from './review.service';
import { ReviewRoutingModule } from './review-routing.module';


@NgModule({
  declarations: [
    ReviewComponent,
    ReviewListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
  ],
  exports: [
    ReviewComponent,
    ReviewListComponent,
  ],
  providers: [
    ReviewService,
  ],
})
export class ReviewModule { }
