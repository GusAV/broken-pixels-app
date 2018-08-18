import { Component, OnInit } from '@angular/core';

import { UserService } from './users.service';
import { User } from './types/user-model';


@Component({
  selector: 'app-users-component',
  templateUrl: './users.component.html',
})
export class UserComponent implements OnInit {

  users: any = [];

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(_users => {
      this.users = _users['results'];
      console.log(this.users);
    });
  }
}
