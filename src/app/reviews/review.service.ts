import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { Review } from './types/review-model';

import { environment } from '../../environments/environment';


@Injectable()
export class ReviewService {

  private apiRoot = environment.apiRoot;
  private headers = new HttpHeaders();

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}


  getReviews(searchParams?: HttpParams): Observable<any> {

    return this.http.get(
      this.apiRoot.concat('review/'),
      { headers: this.headers, params: searchParams }
    );
  }

  getReview(_id: number|any): Observable<any> {
    const id = _id.toString();

    return this.http.get(
      this.apiRoot.concat('review/' + id + '/'),
    );
  }

  getReviewOptions(): Observable<any> {
    return this.http.options(
      this.apiRoot.concat('review/'),
    );
  }

  createReview(data: any): Observable<any> {
    return this.http.post(
      this.apiRoot.concat('review_create/'), data
    );
  }
}
