import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from "../../event/event.interface";
import { EventGroupsService } from "./event-groups.service";
import { IEventGroup } from "./event-groups.interaface";
import { EventService } from "../../event/event.service";
import { IActionState } from "../../client/client.interface";
import { Observable } from "rxjs";

@Component({
  selector: 'event-groups',
  templateUrl: 'event-groups.component.html',
  styleUrls: ['event-groups.component.scss']
})

export class EventGroupsComponent implements OnInit {
  constructor(private router: Router,
              private eventGroupsService: EventGroupsService,
              private eventService: EventService) {
  }

  /**
   * Event groups
   *
   * @type {IEventGroup[]}
   * */
  public eventGroups: IEventGroup[];

  /**
   * Events
   *
   * @type {IEvent[]}
   * */
  public events: IEvent[];

  /**
   * Sort actions
   *
   * @type {IActionState[]}
   * */
  public sortActions: IActionState[] = [
    {id: 1, action: 'Upcoming'},
    {id: 2, action: 'Descending'}
  ];

  /**
   * Handle Sorting
   *
   * @param {number} event id
   * @return {void}
   * */
  public onSortChanged(event: number): void {
    console.log("onSortChanged");
    console.log(event);
  }

  public ngOnInit(): void {
    // this.getEvents();
    this.getEventGroups();
  }

  /**
   * Get event groups
   *
   * @return {void}
   * */
  public getEventGroups() {
    this.eventGroupsService
      .getEventGroups()
      .subscribe((eventGroups: IEventGroup[]) => {
      console.log("eventGroups");
      console.log(eventGroups);
        this.eventService.getEvents()
          .subscribe((events: any) => {
          console.log("events");
          console.log(events);

            // this.eventGroups = eventGroups.map(eg =>
            //   eg.events = events.filter(
            //     e => (eg.eventIds.some(eId => eId === e.id))
            //   )
            // )
          })
      });
  }


  /**
   * Get Events
   *
   *@returns {void}
   */
  public getEvents() {
    this.eventService
      .getEvents()
      .subscribe((events: IEvent[]) =>
        this.events = events
      );
  }
}
