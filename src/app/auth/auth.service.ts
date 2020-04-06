import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private apiRoot = environment.apiRoot;

  constructor(
    private http: HttpClient,
  ) {}

  private setSession(authResult) {
    const token = authResult.token;
    const payload = <JWTPayload> jwtDecode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('username', authResult.username);
    this.getUser();
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(username_or_email: string, password: string) {
    return this.http.post(
      this.apiRoot.concat('login/'),
      { username_or_email, password }
    ).pipe(
      tap(response => {
        response['username'] = username_or_email;
        this.setSession(response);
      }),
      shareReplay(),
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(
        this.apiRoot.concat('refresh-token/'),
        { 'token': this.token }
      ).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  isLoggedIn() {
    const user = localStorage.getItem('username');

    if (user) {
      this.getUser();
    }

    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  signup(userData: any): Observable<any> {
    return this.http.post(
      this.apiRoot.concat('user/signup/'),
      userData
    ).pipe(
      tap(response => {
        this.setSession(response);
      }),
      shareReplay(),
    );
  }

  getUser(): Observable<any> {
    return this.http.get(
      this.apiRoot.concat('user/current_user/')
    );
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.authService.refreshToken();
      return true
    } else {
      this.authService.logout();
      return false
    }
  }
}

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}
