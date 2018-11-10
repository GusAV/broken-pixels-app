import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from './game.service';
import { Game } from './types/game-model';
import { ReviewService } from '../reviews/review.service';
import { AuthService } from '../auth.service';
import { AuthComponent } from '../auth.component';

@Component({
  selector: 'app-game-component',
  templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {

  @ViewChild('reviewComponent') reviewComponent;
  game: Game;
  customCover = '//www.selectgame.com.br/wp-content/uploads/2016/08/desconto-em-tudo-800x400.png';
  cover = '';
  reviewText = '';
  user: any;
  noUserError = false;
  disableText = false;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private authService: AuthService,
    private authComponent: AuthComponent,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(_params => {
      const id = _params.get('id');

      this.gameService.getGame(id).subscribe(_game => {
        this.game = _game;

        if (this.game.cover) {
          this.cover = this.game.cover['url'];
        } else {
          this.cover = this.customCover;
        }
      });
    });
  }

  getUser() {
    this.noUserError = false;

    if (this.authService.isLoggedIn()) {
      this.user = this.authService.user;
    } else {
      this.noUserError = true;
      this.authComponent.loginOff = false;
      this.authComponent.isLogin = 2;
    }
  }

  createReview() {
    if (!this.user) {
      this.getUser();
    } else {

      const _review = {
        review: this.reviewText,
        user: this.user.id,
        game: this.game.id,
      };

      this.reviewService.createReview(_review).subscribe(_res => {
        this.reviewComponent.updateList();
        this.reviewText = '';
      });
    }
  }

  countLetters() {
    const count = 200 - this.reviewText.length;

    if (count <= 0) {
      this.disableText = true;
    } else {
      this.disableText = false;
    }
    return count.toString().concat('/200');
  }
}
