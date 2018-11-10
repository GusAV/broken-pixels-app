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
  inputType = 'password';

  constructor(
    private authComponent: AuthComponent,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  login(username: string, password: string) {
    this.loginError = {};
    this.authService.login(username, password).subscribe(
      success => {
        this.authComponent.getUser();
     }, error => {
       this.loginError = error['error'];
     }
    );
  }

  changeType(_type: string) {
    this.inputType = _type;
  }
}
