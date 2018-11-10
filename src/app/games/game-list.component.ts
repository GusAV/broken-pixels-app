import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from './game.service';
import { Game } from './types/game-model';


@Component({
  selector: 'app-game-list-component',
  templateUrl: './game-list.component.html',
})
export class GameListComponent implements OnInit {

  games: Game[] = [];
  search = '';
  currentPage = '1';
  count = 1;
  pages = [];
  totalPages = 1;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.queryGames();
  }

  queryGames() {
    if (this.search) {
      let params = new HttpParams();

      params = params.set('page', this.currentPage);
      params = params.set('category', '0');

      params = params.set('name', this.search);

      this.gameService.getGames(params).subscribe(_games => {
        if (_games['count'] > 0) {
          this.games = _games['results'];
          this.count = _games['count'];
        } else {
          this.games = [];
          this.count = 1;
        }
        this.buildPageSelector();
      });
    }
  }

  buildPageSelector() {
    this.pages = [];
    this.totalPages = 0;

    if (this.count > 10) {
      const _pages = Math.ceil(this.count / 10);
      this.totalPages = _pages;
      const _currentPage = Number(this.currentPage);

      if (_pages > 5) {
        if (_currentPage === _pages) {
          this.pages.push(_currentPage - 4);
          this.pages.push(_currentPage - 3);
        } else if (_currentPage === _pages - 1) {
          this.pages.push(_currentPage - 4);
        }

        for (let i = _currentPage - 2; i <= _currentPage + 2; i++) {
          if (i > 0 && i <= _pages) {
            this.pages.push(i);
          }
        }

        if (_currentPage === 1) {
          this.pages.push(_currentPage + 3);
          this.pages.push(_currentPage + 4);
        } else if (_currentPage === 2) {
          this.pages.push(_currentPage + 3);
        }
      } else {
        for (let i = 1; i <= _pages; i++) {
          this.pages.push(i);
        }
      }
    }
  }

  searchGames(search) {
    if (search) {
      this.search = search;
    } else {
      this.search = '';
    }

    this.currentPage = '1';

    this.queryGames();
  }

  changePage(page) {
    this.currentPage = page.toString();
    this.queryGames();
  }

  toFirst() {
    this.currentPage = '1';
    this.queryGames();
  }

  toPrevious() {
    const _page = Number(this.currentPage) - 1;
    if (_page > 0) {
      this.currentPage = _page.toString();
      this.queryGames();
    }
  }

  toNext() {
    const _page = Number(this.currentPage) + 1;
    if (_page <= this.totalPages) {
      this.currentPage = _page.toString();
      this.queryGames();
    }
  }

  toLast() {
    this.currentPage = this.totalPages.toString();
    this.queryGames();
  }

  toGame(game) {
    this.router.navigate(['games', game.id]);
    this.search = null;
  }
}
