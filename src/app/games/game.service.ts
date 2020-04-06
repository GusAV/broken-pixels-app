import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Game } from './types/game-model';

import { environment } from '../../environments/environment';


@Injectable()
export class GameService {

  private apiRoot = environment.apiRoot;
  private headers = new HttpHeaders();

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}


  getGames(searchParams?: HttpParams): Observable<any> {

    return this.http.get(
      this.apiRoot.concat('game/'),
      { headers: this.headers, params: searchParams }
    );
  }

  getGame(_id: number|any): Observable<any> {
    const id = _id.toString();

    return this.http.get(
      this.apiRoot.concat('game/' + id + '/'),
    );
  }

  checkUserReviews(id: number): Observable<any> {
    const _id = id.toString();

    return this.http.get(
      this.apiRoot.concat('game/' + _id + '/review-user/')
    );
  }
}
