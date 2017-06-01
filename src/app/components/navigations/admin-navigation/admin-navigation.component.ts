import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-navigation',
  templateUrl: 'admin-navigation.component.html',
  styleUrls: ['admin-navigation.component.scss']
})

export class AdminNavigationComponent {
  public curLocation: string;

  constructor(private location: Location,
              private router: Router) {
    this.router.events.subscribe((val) =>
      this.curLocation = this.location.path()
    );
  }
}
