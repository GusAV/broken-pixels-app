import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { AppRoutingModule } from './app-routing.module';
import { UsersRoutingModule } from './users/users-routing.module';
import { UserService } from './users/users.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    UsersModule,
    AppRoutingModule,
    UsersRoutingModule,
  ],
  providers: [
    UserService,
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
