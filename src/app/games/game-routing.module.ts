import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.service';

import { GameComponent } from './game.component';


const routes: Routes = [
  { path: 'games/:id', component: GameComponent },
];


@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forRoot(routes),
  ]
})
export class GameRoutingModule {}
