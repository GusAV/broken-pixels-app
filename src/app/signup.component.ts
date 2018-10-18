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
  user = {};

  constructor(
    private authComponent: AuthComponent,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.user = {
      username: '',
      email: '',
      password: ''
    }
  }

  signup() {
    this.authService.signup(this.user).subscribe(
      success => {
        this.user = {};
        this.router.navigate(['profiles'])
        this.authComponent.getUser();
      }, error => {
        this.signupError = error
      }
    );
  }
}
