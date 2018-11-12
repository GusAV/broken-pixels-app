import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ClickOutsideModule } from 'ng-click-outside';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileModule } from './profiles/profile.module';
import { ProfileRoutingModule } from './profiles/profile-routing.module';
import { ProfileService } from './profiles/profile.service';
import { GameModule } from './games/game.module';
import { GameRoutingModule } from './games/game-routing.module';
import { GameService } from './games/game.service';
import { ReviewModule } from './reviews/review.module';
import { ReviewRoutingModule } from './reviews/review-routing.module';
import { ReviewService } from './reviews/review.service';
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
    GameModule,
    ReviewModule,
    AppRoutingModule,
    ProfileRoutingModule,
    GameRoutingModule,
    ReviewRoutingModule,
    FormsModule,
    ClickOutsideModule,
    InfiniteScrollModule,
  ],
  providers: [
    ProfileService,
    GameService,
    ReviewService,
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
