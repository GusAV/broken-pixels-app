import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { AuthComponent } from './auth.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginError: any;

  constructor(
    private authComponent: AuthComponent,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      success => {
        this.router.navigate(['profiles']);
        this.authComponent.getUser();
      },
      error => this.loginError = error
    );
  }
}
