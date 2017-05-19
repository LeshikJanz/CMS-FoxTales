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
  public eventGroups: IEventGroup[];

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
    {id: 2, action: 'Descending'}
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
    console.log(event);
  }

  public ngOnInit(): void {
    this.getEventGroups();
  }

  /**
   * Get event groups with list of events in each one
   *
   * @return {void}
   */
  public getEventGroups() {
    this.eventGroupsService
      .getEventGroups()
      .subscribe((eventGroups: IEventGroup[]) => {

        this.eventService.getEvents()
          .subscribe((events: any) => {
          this.events = events;
            this.eventGroups = eventGroups.map((eg: IEventGroup) =>
              ({
                ...eg,
                events: events.filter((e: IEvent) => eg.eventIds.some((eId: number) => eId === e.id)
                )
              })
            );
          });
      });
  };
}
