import { Component, OnInit } from '@angular/core';
import { IEvent } from '../../event/event.interface';
import { EventGroupsService } from './event-groups.service';
import { IEventGroup } from './event-groups.interaface';
import { EventService } from '../../event/event.service';
import { IActionState } from '../../client/client.interface';

@Component({
  selector: 'event-groups',
  templateUrl: 'event-groups.component.html',
  styleUrls: ['event-groups.component.scss']
})

export class EventGroupsComponent implements OnInit {
  /**
   * Event groups
   *
   * @type {IEventGroup[]}
   */
  public eventGroups: any[];

  /**
   * Events
   *
   * @type {IEvent[]}
   */
  public events: IEvent[];

  /**
   * Sort actions
   *
   * @type {IActionState[]}
   */
  public sortActions: IActionState[] = [
    {id: 1, action: 'Upcoming'},
    {id: 2, action: 'Descending'},
    {id: 3, action: 'Start date'},
    {id: 4, action: 'End date'},
  ];

  constructor(private eventGroupsService: EventGroupsService,
              private eventService: EventService) {
  }

  /**
   * Handle Sorting
   *
   * @param {number} event id
   * @return {void}
   */
  public onSortChanged(event: number): void {
    console.log('onSortChanged');
  }

  public ngOnInit(): void {
    this.getEventGroups();
    this.getEvents();
  }

  public onSave() {
    this.getEventGroups();
  }

  /**
   * Get event groups
   *
   * @return {void}
   */
  public getEventGroups() {
    this.eventGroupsService
      .getEventGroups()
      .subscribe((eventGroups: IEventGroup[]) => {

        this.eventGroups = eventGroups;

      });
  };

  /**
   * Get events
   *
   * @return {void}
   */
  public getEvents() {
    this.eventService
      .getEvents()
      .subscribe((events: IEvent[]) =>
        this.events = events
      );
  };
}
