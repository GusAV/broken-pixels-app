import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

import { User } from './types/user-model';

@Injectable()
export class UserService {

  private apiRoot = 'http://localhost:8000/';
  headers = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
  }

  constructor(
    private http: HttpClient,
  ) {}

  getUsers() {
    return this.http.get(
      this.apiRoot.concat('user/'), this.headers);
  }
}
