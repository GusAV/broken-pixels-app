import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProfileModule } from './profiles/profile.module';
import { AppRoutingModule } from './app-routing.module';
import { ProfileRoutingModule } from './profiles/profile-routing.module';
import { ProfileService } from './profiles/profile.service';
import { LoginComponent } from './login.component';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup.component';
import { NavbarComponent } from './navbar.component';
import { AuthService, AuthInterceptor, AuthGuard } from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AuthComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    ProfileModule,
    AppRoutingModule,
    ProfileRoutingModule,
    FormsModule,
  ],
  providers: [
    ProfileService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
