import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EventService } from '../event.service';
import { IActionState } from '../../client/client.interface';
import { EventGroupsService } from '../../event-groups/list/event-groups.service';
import { IEventFilter, IEvent } from '../event.interface';
import { ITableAction } from '../../shared/table/action.interface';
import { RouteData } from '../../shared/core/event-management/route-data.service';
import * as moment from 'moment';

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
   * Clone modal
   *
   * @type {ModalDirective}
   */
  @ViewChild('cloneModal')
  public cloneModal: ModalDirective;

  /**
   * Event
   *
   * @type {Event[]}
   */
  public Events: any[];

  /**
   * Event to be cloned
   *
   * @type {IEvent}
   */
  public eventToClone: IEvent;

  /**
   * Cloned event
   *
   * @type {IEvent}
   */
  public clonedEvent: IEvent;

  /**
   * Is cloned?
   *
   * @type {boolean}
   */
  public isCloned: boolean = false;

  /**
   * Cloned event start date
   *
   * @type {string}
   */
  public cloneStartDate: string;

  /**
   * Clone name
   *
   * @type {string}
   */
  public cloneName: string;

  /**
   * Show clone animation?
   *
   * @type {boolean}
   */
  public showCloneAnimation: boolean = false;

  /**
   * Event
   *
   * @type {Event[]}
   */
  public eventGroups: any[];

  /**
   *  Event actions
   *
   * @type {ITableAction[]}
   */
  public eventActions: ITableAction[] = [
    { id: 1, title: 'EDIT', callback: 'onEdit', acl: 'CreateEditEvents' },
    { id: 2, title: 'CLONE', callback: 'onClone', acl: 'CloneEvents' },
    { id: 3, title: 'DELETE', callback: 'onDelete', acl: 'DeleteEvents' },
    { id: 4, title: 'ADD TO GROUP', callback: 'onAddToGroup', acl: 'CreateEditEvents' },
    { id: 5, title: 'ASSIGN USERS', callback: 'onAssignUsers', acl: 'CreateEditEvents' },
    {id: 6, title: 'RECAP REPORT', callback: 'onRecapReport', acl: 'ViewSendRecapReport' },
    {id: 7, title: 'EXPORT CRM DATA', callback: 'onExportCrmData', acl: 'ExportCRMData' }
  ];

  /**
   * Initial sort object
   *
   * @type {IEventFilter}
   */
  public initialSorting: IEventFilter = {
    sortBy: 'StartTime',
    sortAscending: true
  };

  /**
   * Sort actions
   *
   * @type {IActionState[]}
   */
  public sortActions: IActionState[] = [
    { id: 1, action: 'Upcoming', callback: 'onUpcomingSort' },
    { id: 2, action: 'Descending', callback: 'onDescendingSort' },
    { id: 3, action: 'Start date', callback: 'onStartDateSort' },
    { id: 4, action: 'End date', callback: 'onEndDateSort' },
  ];

  constructor(private eventService: EventService,
              private eventGroupsService: EventGroupsService,
              private _routeData: RouteData) {
    // _routeData.name.next('Event Management');
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
    const filter = { sortBy: 'Name', sortAscending: true };
    this.getEvents(filter);
  }

  /**
   * On descending sorting
   *
   * @returns {void}
   */
  public onDescendingSort() {
    const filter = { sortBy: 'Name', sortAscending: false };
    this.getEvents(filter);
  }

  /**
   * On start date sorting
   *
   * @returns {void}
   */
  public onStartDateSort() {
    this.getEvents(this.initialSorting);
  }

  /**
   * On end date sorting
   *
   * @returns {void}
   */
  public onEndDateSort() {
    const filter = { sortBy: 'EndTime', sortAscending: true };
    this.getEvents(filter);
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
    console.log('onActionChanged');
  }
  /**
   * On search changed
   *
   * @param {string} event - Search string
   * @returns {void}
   */
  public onSearchChange(event: string): void {
    console.log('onSearchChange');
  }

  /**
   * Get events
   *
   * @returns {void}
   */
  public getEvents(filter: IEventFilter = this.initialSorting): void {
    this.eventService
      .getEvents(filter)
      .subscribe((events) => {
        this.Events = events;
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

  public onDeleteEvent() {
    this.getEvents();
  }

  /**
   * Clone event action
   *
   * @param {IEvent} event - Event
   * @returns {void}
   */
  public onClone(event: IEvent): void {
    this.isCloned = false;
    this.eventToClone = event;
    this.cloneModal.show();
  }

  /**
   * Save clone
   *
   * @returns {void}
   */
  public saveClone(): void {
    this.showCloneAnimation = true;

    this.eventService
      .cloneEvent(
        this.eventToClone.id,
        this.cloneName,
        this.getStartDate()
      )
      .subscribe((clonedEvent: IEvent) => {
        this.isCloned = true;
        this.showCloneAnimation = false;
        this.clonedEvent = clonedEvent;

        this.getEvents();
      });
  }

  /**
   * Update clone
   *
   * @returns {void}
   */
  public updateClone(): void {
    let requestData = {
      id: this.clonedEvent.id,
      name: this.cloneName,
      startTime: this.getStartDate()
    };

    this.eventService
      .updateEvent(requestData)
      .subscribe(() => {
        this.cloneModal.hide();
      });
  }

  public getStartDate(): string {
    return moment(this.cloneStartDate).format();
  }
}
