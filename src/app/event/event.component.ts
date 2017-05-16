import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'events',
  templateUrl: './event-group.component.html'
})

export class EventComponent {
  constructor(private router: Router) {}
}
