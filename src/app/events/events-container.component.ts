import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'events',
  templateUrl: './events-container.component.html'
})

export class EventsComponent {
  public curLocation: string;

  constructor(private location: Location,
              private router: Router) {
    this.router.events.subscribe((val) =>
      this.curLocation = this.location.path()
    );
  }
}
