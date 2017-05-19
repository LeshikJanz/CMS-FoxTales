import { Component, Input } from '@angular/core';
import { IActionState } from '../../client/client.interface';
import { IEventGroup } from '../../event-groups/list/event-groups.interaface';
import { ModalDirective } from 'ngx-bootstrap';

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

  public eventActions: IActionState[] = [
    {id: 1, action: 'Edit'},
  ];

  public sortActions: IActionState[] = [
    {id: 1, action: 'Upcoming'},
    {id: 2, action: 'Descending'}
  ];

  public addEventsToGroup(action) {
    console.log('addEventsToGroup');
  }

  public onTypeChanged(elem) {
    switch (elem.event.id) {
      case 1:
        console.log('Edit');
        break;
      case 2:
        console.log('Configure Gallery');
        break;
      case 3:
        this.modal.show(elem.groupName);
        break;
      default: break;
    }
  }
}
