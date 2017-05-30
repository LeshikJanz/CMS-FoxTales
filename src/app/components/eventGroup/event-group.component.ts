import { Component, Input } from '@angular/core';
import { IActionState } from '../../client/client.interface';
import { IEventGroup } from '../../event-groups/list/event-groups.interaface';
import * as moment from 'moment';
import { IEvent } from '../../event/event.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'event-group',
  templateUrl: 'event-group.component.html',
  styleUrls: ['event-group.component.scss']
})

export class EventGroupComponent {

  /**
   * Event groups
   *
   * @type {IEventGroup[]}
   */
  @Input() public eventGroups: IEventGroup[];

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
   * @type {IActionState[]}
   */
  public groupActions: IActionState[] = [
    {id: 1, action: 'EDIT', callback: 'editEventGroup'},
    {id: 2, action: 'CONFIGURE GALLERY', callback: 'configureGallery'},
    {id: 3, action: 'ADD EVENTS TO GROUP', callback: 'addEventsToGroup'}
  ];

  /**
   * Actions for each event
   *
   * @type {IActionState[]}
   */
  public eventActions: IActionState[] = [
    {id: 1, action: 'Edit'},
  ];

  /**
   * Actions for sorting groups
   *
   * @type {IActionState[]}
   */
  public sortActions: IActionState[] = [
    {id: 1, action: 'Upcoming'},
    {id: 2, action: 'Descending'}
  ];


  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @returns {void}
   */
  constructor(private router: Router) {
  }

  /**
   * Edit event group
   *
   * @return {void}
   */
  public editEventGroup(group: IEventGroup) {
    this.router.navigate(['events/event-group', group.id])
  }

  /**
   * Handler on switching menu actions
   *
   * @param{any} - {IEvent, IActionState}
   * @return {void}
   */
  public onTypeChanged(elem) {
    switch (elem.event.id) {
      case 1:
        this.editEventGroup(elem.group)
        break;
      case 2:
        console.log('Configure Gallery');
        break;
      case 3:
        this.modal.show(elem.group);
        break;
      default:
        break;
    }
  }

  /**
   * Get min event date
   *
   * @param {IEventGroup} eventGroup
   * @return {string} min date
   */
  public getMinDate(eventGroup: IEventGroup) {
    return moment(eventGroup.events.map((e: IEvent) =>
      moment(e.startTime).format('YYYY/MM/DD/hh/mm/ss'))
      .reduce((a, b) => a < b ? a : b), 'YYYY/MM/DD/hh/mm/ss')
      .format('MMMM DD');
  }

  /**
   * Get max event date
   *
   * @param {IEventGroup} eventGroup
   * @return {string} max date
   */
  public getMaxDate(eventGroup: IEventGroup) {
    return moment(eventGroup.events.map((e: IEvent) =>
      moment(e.startTime).format('YYYY/MM/DD/hh/mm/ss'))
      .reduce((a, b) => a > b ? a : b), 'YYYY/MM/DD/hh/mm/ss')
      .format('DD, YYYY');
  }
}
