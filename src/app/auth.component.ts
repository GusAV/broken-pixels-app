import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLogin = false;
  user = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe(_user => {
      this.user = _user;
      console.log(this.user);
    })
  }

  logout() {
    this.authService.logout();
    this.user = null;
  }
}
