import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'events-navigation',
  templateUrl: 'events-navigation.component.html',
  styleUrls: ['events-navigation.component.scss',
  '../../../shared/styles/navigation.scss']
})

export class EventsNavigationComponent {
  public curLocation: string;

  constructor(private location: Location,
              private router: Router) {
    this.router.events.subscribe((val) => {
      this.curLocation = this.location.path()
    }
    );
  }

}
