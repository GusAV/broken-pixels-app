import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../theme/imports.scss']
})
export class AppComponent {

  title = 'brokenpixels-app';
  public loadingPage = true;

  constructor(
    private router: Router,
  ) {

    this.router.events.subscribe((event) => {
      this.loadingPage = true;

      setTimeout(() => {
        if (event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError) {
          this.loadingPage = false;
        }
      }, 1000);
    });
  }
}
