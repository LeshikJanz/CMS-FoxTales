import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { IActionState } from '../../client/client.interface';
import { EventGroupsService } from '../../event-groups/list/event-groups.service';
import { filter } from "rxjs/operator/filter";
import { IEventFilter } from "../event.interface";

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

  /**
   * Event
   *
   * @type {Event[]}
   */
  public eventGroups: any[];

  /**
   *  Event actions
   *
   * @type {IActionState[]}
   */
  public eventActions: IActionState[] = [
    {id: 1, action: 'SETTINGS'},
    {id: 2, action: 'CLONE'},
    {id: 3, action: 'ARCHIEVE'},
    {id: 4, action: 'ADD TO GROUP'},
    {id: 5, action: 'ASSIGN USERS'},
  ];

  /**
   * Sort actions
   *
   * @type {IActionState[]}
   */
  public sortActions: IActionState[] = [
    {id: 1, action: 'Upcoming', callback: 'onUpcomingSort'},
    {id: 2, action: 'Descending', callback: 'onDescendingSort'},
    {id: 3, action: 'Start date', callback: 'onStartDateSort'},
    {id: 4, action: 'End date', callback: 'onEndDateSort'},
  ];

  constructor(private eventService: EventService,
              private eventGroupsService: EventGroupsService) {
  }

  public ngOnInit(): void {
    this.getEvents();
    this.getEventGroups();
  }

  /**
   * On upcoming sorting
   *
   * @returns {void}
   */
  public onUpcomingSort() {
    this.getEvents({ StartTime: true });
  }

  /**
   * On descending sorting
   *
   * @returns {void}
   */
  public onDescendingSort() {
    console.log('onDescendingSort')
  }

  /**
   * On start date sorting
   *
   * @returns {void}
   */
  public onStartDateSort() {
    // this.getEvents({ sortBy: 'StartTime' });
  }

  /**
   * On end date sorting
   *
   * @returns {void}
   */
  public onEndDateSort() {
    this.getEvents({ StartTime: false });
  }

  /**
   * Handle Sorting
   *
   * @param {IActionState}
   * @return {void}
   */
  public onSortChanged(action: IActionState): void {
    if (this[action.callback]) {
      this[action.callback](action.id);
    }
  }

  /**
   * On action changed
   *
   * @param {any} action - Action
   * @returns {void}
   */
  public onActionChanged(action: any): void {

  }

  /**
   * Get events
   *
   * @returns {void}
   */
  public getEvents(filter: IEventFilter = {}): void {
    this.eventService
      .getEvents(filter)
      .subscribe((events) => {
        this.Events = events;
        console.log('this.Events');
        console.log(this.Events);
      });
  }

  /**
   * Get event groups
   *
   * @returns {void}
   */
  public getEventGroups(): void {
    this.eventGroupsService
      .getEventGroups()
      .subscribe((eventGroups) => {
        this.eventGroups = eventGroups;
      });
  }
}
