import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { UserComponent } from './users.component';
import { UserService } from './users.service';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    HttpClientModule,
  ],
  exports: [
  ],
  providers: [
    UserService,
  ],
})
export class UsersModule { }
