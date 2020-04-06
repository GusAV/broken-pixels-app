import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.service';

import { ReviewComponent } from './review.component';


const routes: Routes = [
  { path: 'reviews', component: ReviewComponent },
];


@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class ReviewRoutingModule {}
