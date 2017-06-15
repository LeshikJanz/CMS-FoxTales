import { Component, Input } from '@angular/core';
import { RouteData } from '../shared/core/routing/route-data.service';

@Component({
  selector: 'events',
  templateUrl: './events-container.component.html'
})

export class EventsComponent {
  constructor(private _routeData: RouteData) {
    // _routeData.name.next('Event Management');
  }
}
