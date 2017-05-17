import { Component, Input } from '@angular/core';
import { IActionState } from "../../client/client.interface";
import { IEvent } from "../../event/event.interface";
import { IEventGroup } from "../../event-groups/list/event-groups.interaface";

@Component({
  selector: 'event-group',
  templateUrl: 'event-group.component.html',
  styleUrls: [ 'event-group.component.scss' ]
})

export class EventGroupComponent {

  /**
   * Event groups
   *
   * @type {IEventGroup[]}
   * */
  @Input() eventGroups: IEventGroup[];

  /**
   * Is event group tab open?
   *
   * @type {boolean}
   * */
  public isOpen: boolean = false;

  /**
   * Actions for each event group
   *
   * @type {IActionState[]}
   * */
  public groupActions: IActionState[] = [
    { id: 1, action: 'Edit', callback: 'editEventGroup' },
    { id: 2, action: 'Configure Gallery',  callback: 'configureGallery' },
    { id: 3, action: 'Add Events to Group', callback: 'addEventsToGroup'  }
  ];

  public eventActions: IActionState[] = [
    { id: 1, action: 'Edit' },
  ];

  public sortActions: IActionState[] = [
    { id: 1, action: 'Upcoming' },
    { id: 2, action: 'Descending' }
  ];

  public onTypeChanged(event) {
    switch(event){
      case 1:
        console.log('Edit')
        break;
      case 2:
        console.log('Configure Gallery')
        break;
      case 3:
        console.log('Add Events to Group')
        break;
    }
  }
}
