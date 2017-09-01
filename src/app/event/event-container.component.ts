import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'event-container',
  templateUrl: 'event-container.component.html'
})

export class EventContainerComponent {
  constructor(private router: Router) {}
}
