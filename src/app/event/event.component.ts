import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'events',
  templateUrl: './event-group-create.component.html'
})
export class EventComponent {
  constructor(private router: Router) {
  }
}
