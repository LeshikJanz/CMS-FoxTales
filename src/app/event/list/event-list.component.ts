import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

/**
 * Event list component
 */
@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  /**
   * Event
   *
   * @type {Event[]}
   */
  public Events: any[];

  constructor(private eventService: EventService) {
  }

  public ngOnInit(): void {
    this.getEvents();
  }

  /**
   * Get events
   *
   * @returns {void}
   */
  public getEvents(): void {
    this.eventService
      .getEvents()
      .subscribe((event) => {
        this.Events = event;
      });
  }
}
