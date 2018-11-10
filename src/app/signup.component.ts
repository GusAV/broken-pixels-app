import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { AuthComponent } from './auth.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {

  signupError: any;
  userForm = {};
  inputType = 'password';

  constructor(
    private authComponent: AuthComponent,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userForm = {
      username: '',
      email: '',
      password: '',
    };
  }

  signup() {
    this.signupError = {};
    this.authService.signup(this.userForm).subscribe(
      success => {
        this.userForm = {};
        this.authComponent.getUser();
      }, error => {
        this.signupError = error['error'];
      }
    );
  }

  changeType(_type: string, e: Event) {
    this.inputType = _type;
  }
}
