import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EventService } from '../event.service';
import { IActionState } from '../../client/client.interface';
import { EventGroupsService } from '../../event-groups/list/event-groups.service';
import { IEventFilter, IEvent, IEventList } from '../event.interface';
import { ITableAction } from '../../shared/table/action.interface';
import { RouteData } from '../../shared/core/event-management/route-data.service';
import * as moment from 'moment';
import { IEventGroupFilter, IEventGroup } from '../../event-groups/list/event-groups.interaface';

/**
 * Event list component
 */
@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss',
    '../../shared/styles/form-element.scss']
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
  public Events: IEvent[];

  /**
   * Unused event groups
   *
   * @type {IEventGroup[]}
   */
  public unusedEventGroups: IEventGroup[];

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
  ];

  public eventActionsCompleted = [
    { id: 1, title: 'View Details', callback: 'onViewDetails', acl: 'CreateEditEvents' },
    { id: 2, title: 'Clone', callback: 'onClone', acl: 'CloneEvents' },
    { id: 3, title: 'Recap Report', callback: 'onRecapReport', acl: 'ViewSendRecapReport' },
    { id: 4, title: 'View Analytics' },
    { id: 5, title: 'Export CRM Data', callback: 'onExportCrmData', acl: 'ExportCRMData' },
    { id: 6, title: 'Add to Group', callback: 'onAddToGroup', acl: 'CreateEditEvents' },
  ];

  /**
   * Initial sort object
   *
   * @type {IEventFilter}
   */
  public initialSorting: IEventFilter = {
    sortBy: 'StartTime',
    sortAscending: true,
    currentPage: 1,
    numberOfRowsOnPage: 10
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

  /**
   * Start offset
   *
   * @type {number}
   */
  public startOffset: number = 1;

  /**
   * End offset
   *
   * @type {number}
   */
  public endOffset: number = 10;

  /**
   * Page number
   *
   * @type {number}
   */
  public page: number = 1;

  /**
   * Limit per page
   *
   * @type {number}
   */
  public limit: number = 10;

  public rowsCount: number = 0;

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
    this.initialSorting.sortBy = 'Name';
    this.initialSorting.sortAscending = true;

    this.getEvents();
  }

  /**
   * On descending sorting
   *
   * @returns {void}
   */
  public onDescendingSort() {
    this.initialSorting.sortBy = 'Name';
    this.initialSorting.sortAscending = false;

    this.getEvents();
  }

  /**
   * On start date sorting
   *
   * @returns {void}
   */
  public onStartDateSort() {
    this.getEvents();
  }

  /**
   * On end date sorting
   *
   * @returns {void}
   */
  public onEndDateSort() {
    this.initialSorting.sortBy = 'EndTime';
    this.initialSorting.sortAscending = true;

    this.getEvents();
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
   * @param {string} filter - Search string
   * @returns {void}
   */
  public onSearchChange(filter: string): void {
    this.eventService.getEventList({ name: filter })
      .subscribe((eventList: IEventList) => {
        this.Events = eventList.result;
        this.rowsCount = eventList.totalRowCount;
      })
  }

  /**
   * Get events
   *
   * @returns {void}
   */
  public getEvents(): void {
    this.eventService
      .getEventList(this.initialSorting)
      .subscribe((eventList: IEventList) => {
        this.Events = eventList.result;
        this.rowsCount = eventList.totalRowCount;
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

  /**
   * Emit page changed event
   *
   * @returns {void}
   */
  public changePage(): void {
    this.startOffset = (this.page - 1) * this.limit + 1;
    this.endOffset = (this.rowsCount < this.page * this.limit)
      ? this.rowsCount
      : this.page * this.limit;

    this.initialSorting.currentPage = this.page;

    this.getEvents();
  }

  /**
   * Emit page changed event
   *
   * @returns {void}
   */
  public prevPage(): void {
    if (this.isPrevPage()) {
      this.page--;
    }

    this.changePage();
  }

  /**
   * Emit page changed event
   *
   * @returns {void}
   */
  public nextPage(): void {
    if (this.isNextPage()) {
      this.page++;
    }

    this.changePage();
  }


  /**
   * Get unused event groups ( do not contain current event )
   *
   * @param {number} eventId - event id
   * @return {void}
   */
  public getUnusedGroups(eventId: any) {
    console.log('getUnusedEventGroups');
    console.log('getUnusedEventGroups');

    const filter: IEventGroupFilter = { eventId };

    this.eventGroupsService
      .getEventGroups(filter)
      .subscribe((eventGroups: IEventGroup[]) =>
        this.unusedEventGroups = eventGroups
      );
  };

  /**
   * Is prev page active?
   *
   * @returns {boolean}
   */
  public isPrevPage(): boolean {
    return this.page > 1;
  }

  /**
   * Is next page active?
   *
   * @returns {boolean}
   */
  public isNextPage(): boolean {
    return this.page < Math.ceil(this.rowsCount / this.limit);
  }
}
