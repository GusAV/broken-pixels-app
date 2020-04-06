import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';

import { GameComponent } from './game.component';
import { GameListComponent } from './games-list/game-list.component';
import { GameService } from './game.service';
import { GameRoutingModule } from './game-routing.module';
import { ReviewModule } from '../reviews/review.module';
import { AuthComponent } from '../auth/auth.component';


@NgModule({
  declarations: [
    GameComponent,
    GameListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReviewModule,
    ClickOutsideModule,
  ],
  exports: [
    GameListComponent,
  ],
  providers: [
    GameService,
    AuthComponent,
  ],
})
export class GameModule { }
