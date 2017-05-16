import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'events',
  templateUrl: './event-groups.component.html'
})

export class EventComponent {
  constructor(private router: Router) {}
}
