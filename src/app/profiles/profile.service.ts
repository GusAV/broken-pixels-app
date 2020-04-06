import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Profile } from './types/profile-model';

import { environment } from '../../environments/environment';

@Injectable()
export class ProfileService {

  private apiRoot = environment.apiRoot;

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
