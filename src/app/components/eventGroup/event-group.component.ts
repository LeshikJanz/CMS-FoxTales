import { Component, Input } from '@angular/core';
import { IActionState } from "../../client/client.interface";
import { IEvent } from "../../event/event.interface";
import { IEventGroup } from "../../event-groups/event-groups.interaface";

@Component({
  selector: 'event-group',
  templateUrl: 'event-group.component.html',
  styleUrls: [ 'event-group.component.scss' ]
})

export class EventGroupComponent {

  @Input() eventGroups: IEventGroup;

  public isOpen: boolean = false;

  public eventActions: IActionState[] = [
    { id: 1, action: 'Edit' },
    { id: 2, action: 'Configure Gallery' },
    { id: 3, action: 'Add Events to Group' },
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
