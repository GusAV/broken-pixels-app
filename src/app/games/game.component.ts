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
  pixelChoices = [];
  pixelSelected = { value: -1, display_name: 'Select your rating choice:' };
  placeholder = 'Write your critic...';
  showPixelChoices = false;
  canReview = false;

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
        this.getUser();

        if (this.game.cover) {
          this.cover = this.game.cover['url'];
        } else {
          this.cover = this.customCover;
        }

        this.reviewService.getReviewOptions().subscribe(_options => {
          this.pixelChoices = _options['actions']['POST']['pixel'].choices;
        });
      });
    });
  }

  getUser() {
    this.noUserError = false;

    if (this.authService.isLoggedIn()) {
      this.authService.getUser().subscribe(_user => {
        this.user = _user;
        this.getCanReview();
      });
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
        game: this.game.id,
        pixel: this.pixelSelected.value,
      };

      this.reviewService.createReview(_review).subscribe(_res => {
        this.reviewComponent.updateList();
        this.getCanReview();
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

  changePixelChoice() {
    if (this.canReview) {
      this.showPixelChoices = !this.showPixelChoices;
    }
  }

  selectPixel(pixel: any) {
    this.pixelSelected = pixel;
    this.changePixelChoice();
  }

  getCanReview() {
    this.gameService.checkUserReviews(this.game.id).subscribe(_res => {
      this.canReview = _res;

      if (_res === false) {
        this.pixelSelected = { value: -1, display_name: 'You already wrote for this game!' };
        this.placeholder = "You're out of lives. You can only write one review for each game.";
        this.reviewText = '';
      } else {
        this.pixelSelected = { value: -1, display_name: 'Select your rating choice:' };
        this.placeholder = 'Write your critic...';
      }
    });
  }
}
