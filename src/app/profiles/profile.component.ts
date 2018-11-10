import { Component, OnInit } from '@angular/core';

import { ProfileService } from './profile.service';
import { Profile } from './types/profile-model';


@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  profiles = [];

  constructor(
    private profileService: ProfileService,
  ) {}

  ngOnInit() {
    this.profileService.getProfiles().subscribe(_profiles => {
      this.profiles = _profiles['results'];
    });
  }
}
