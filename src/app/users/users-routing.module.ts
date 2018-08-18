import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './users.component';


const routes: Routes = [
  { path: 'users', component: UserComponent },
];


@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class UsersRoutingModule {}
