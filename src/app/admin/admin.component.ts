import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html'
})

export class AdminComponent {
  public curLocation: string;

  constructor(private location: Location,
              private router: Router) {
    this.router.events.subscribe((val) =>
      this.curLocation = this.location.path()
    );
  }
}
