import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'event-navigation',
  templateUrl: 'event-navigation.component.html',
  styleUrls: ['event-navigation.component.scss']
})

export class EventNavigationComponent {
  public curLocation: string;
  public eventId: string;

  constructor(private location: Location,
              private router: Router) {
    this.router.events.subscribe((val) =>{
      this.curLocation = this.location.path();
      this.eventId = this.curLocation.split('/')[2];
    });
  }

}
