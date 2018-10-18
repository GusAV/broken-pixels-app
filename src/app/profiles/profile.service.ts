import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { Profile } from './types/profile-model';

@Injectable()
export class ProfileService {

  private apiRoot = 'http://localhost:8000/';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  getProfiles() {
    return this.http.get(
      this.apiRoot.concat('profile/'),
    );
  }
}
