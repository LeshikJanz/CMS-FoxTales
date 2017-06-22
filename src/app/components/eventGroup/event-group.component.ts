import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { IActionState } from '../../client/client.interface';
import { IEventGroup } from '../../event-groups/list/event-groups.interaface';
import * as moment from 'moment';
import { IEvent } from '../../event/event.interface';
import { Router } from '@angular/router';
import { ITableAction } from '../../shared/table/action.interface';
import { ICheckbox } from '../toggles/checkbox/checkbox.component';
import { EventGroupsService } from '../../event-groups/list/event-groups.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'event-group',
  templateUrl: 'event-group.component.html',
  styleUrls: ['event-group.component.scss']
})

export class EventGroupComponent implements OnChanges {

  /**
   * Event groups
   *
   * @type {IEventGroup[]}
   */
  @Input() public eventGroups: any[];

  /**
   * Object controls Modal state
   *
   * @type {any}
   */
  @Input() public modal: any;

  /**
   * Is event group tab open?
   *
   * @type {boolean}
   */
  public isOpen: boolean = false;

  /**
   * Actions for each event group
   *
   * @type {ITableAction[]}
   */
  public groupActions: ITableAction[] = [
    { id: 1, title: 'Edit', callback: 'editEventGroup' },
    { id: 2, title: 'Configure gallery', callback: 'configureGallery' },
    { id: 3, title: 'Add events to group', callback: 'addEventsToGroup' },
    { id: 4, title: 'Remove checked events', callback: 'removeEvents' }
  ];

  /**
   * Actions for each event
   *
   * @type {IActionState[]}
   */
  public eventActions: IActionState[] = [
    { id: 1, action: 'Edit' },
  ];

  /**
   * Actions for sorting groups
   *
   * @type {IActionState[]}
   */
  public sortActions: IActionState[] = [
    { id: 1, action: 'Upcoming' },
    { id: 2, action: 'Descending' }
  ];

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @returns {void}
   */
  constructor(private router: Router,
              private eventGroupService: EventGroupsService,
              private toastrService: ToastrService) {
  }

  public ngOnChanges() {
    if (this.eventGroups) {
      this.eventGroups = this.eventGroups.map((e: IEventGroup) => ({
        ...e,
        timePeriod: e.events.length && this.getTimePeriod(e)
      }));
    }
  }

  /**
   * Edit event group
   *
   * @param {IEventGroup} group - event group
   * @return {void}
   */
  public editEventGroup(group: IEventGroup) {
    this.router.navigate(['events/event-group', group.id]);
  }

  /**
   * Get current group actions
   *
   * @param {IEventGroup} group - event group
   * @return {void}
   */
  public getGroupActions(group: IEventGroup) {
    console.log('getGroupActions');
    return group.events.find((i: IEvent) => i.isChecked) ? this.groupActions
      : this.groupActions.slice(0, 3);
  }

  /**
   * Add events to group
   *
   * @param {IEventGroup} group - event group
   * @return {void}
   */
  public addEventsToGroup(group: IEventGroup) {
    this.modal.show(group);
  }

  /**
   * On event checked/unchecked
   *
   * @param {IEventGroup} group - event group
   * @param {ICheckbox} checkbox - checked/unchecked event
   * @return {void}
   */
  public onChecked(group: IEventGroup, checkbox: ICheckbox) {
    group.events.find((i: IEvent) => i.id === checkbox.id).isChecked
      = checkbox.isChecked;
  }

  /**
   * Remove events from group
   *
   * @param {IEventGroup} group - event group
   * @return {void}
   */
  public removeEvents(group: IEventGroup) {
    const eventIds = group.events.map((e: IEvent) => e.isChecked && e.id)
      .filter((e: boolean|number) => e);
    if (!eventIds.length) {
      this.toastrService.error('No one event is checked');
      return;
    }
    this.eventGroupService.removeGroupEvents(group.id, eventIds)
      .subscribe(() => {
          group.events = group.events.filter((e: IEvent) => !e.isChecked);
          this.toastrService.success('Events have been successfully deleted.');
        }
      );
  }

  /**
   * On event group action changed
   *
   * @param eventGroup
   * @param {IActionState} action - event group action
   * @return {void}
   */
  public onActionChanged(eventGroup: IEventGroup, action: IActionState) {
    if (this[action.callback]) {
      this[action.callback](eventGroup);
    }
  }

  /**
   * Get min event date
   *
   * @param {IEventGroup} eventGroup
   * @return {string} min date
   */
  public getMinDate(eventGroup: IEventGroup): string {
    return moment(eventGroup.events.map((e: IEvent) =>
      moment(e.startTime).format('YYYY/MM/DD/hh/mm/ss'))
      .reduce((a, b) => a < b ? a : b), 'YYYY/MM/DD/hh/mm/ss')
      .format('MMM DD, YYYY');
  }

  /**
   * Get max event date
   *
   * @param {IEventGroup} eventGroup
   * @return {string} max date
   */
  public getMaxDate(eventGroup: IEventGroup): string {
    return moment(eventGroup.events.map((e: IEvent) =>
      moment(e.startTime).format('YYYY/MM/DD/hh/mm/ss'))
      .reduce((a, b) => a > b ? a : b), 'YYYY/MM/DD/hh/mm/ss')
      .format('MMM DD, YYYY');
  }

  /**
   * Get time period
   *
   * @param {IEventGroup} eventGroup
   * @return {string} max date
   */
  public getTimePeriod(eventGroup: IEventGroup): string {
    let startDate: string = this.getMinDate(eventGroup);
    let startDateFormat = 'MMM DD, YYYY';
    let endDate: string = this.getMaxDate(eventGroup);
    let endDateFormat = 'MMM DD, YYYY';

    if (moment(startDate, startDateFormat).get('year') ===
      moment(endDate, endDateFormat).get('year')) {
      startDateFormat = 'MMM DD';
      startDate = moment(startDate).format(startDateFormat);
    }

    if (moment(startDate, startDateFormat).get('month') ===
      moment(endDate, endDateFormat).get('month')) {
      endDateFormat = 'DD, YYYY';

      if (moment(startDate, startDateFormat).get('date') ===
        moment(endDate, endDateFormat).get('date')) {
        return endDate;
      }
      endDate = moment(endDate).format(endDateFormat);
    }

    return `${startDate} - ${endDate}`;
  }
}
