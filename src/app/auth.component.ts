import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLogin = 1;
  loginOff = true;
  user = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = null;

    setTimeout(() => {
      if (this.authService.isLoggedIn()) {
        this.authService.getUser().subscribe(_user => {
          this.user = _user;
        });
      }
    }, 200);
  }

  selectLogin(show: number) {
    if (this.isLogin === show) {
      this.loginOff = true;
      this.isLogin = 1;
    } else {
      this.loginOff = false;
      this.isLogin = show;
    }
  }

  logout() {
    this.authService.logout();
    this.user = null;
  }
}
