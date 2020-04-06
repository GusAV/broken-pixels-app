import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.service';

import { ProfileComponent } from './profile.component';


const routes: Routes = [
  { path: 'profiles', component: ProfileComponent, canActivate: [AuthGuard] },
];


@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class ProfileRoutingModule {}
