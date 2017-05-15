import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'events',
  templateUrl: './events-container.component.html'
})

export class EventsComponent {
  constructor(private router: Router) {}
}
