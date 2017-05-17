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
    { id: 1, action: 'Edit' }
  ];

  public onTypeChanged(event) {
    switch(event){
      case 1:
        console.log('settings')
        break;
      case 2:
        console.log('clone')
        break;
      case 3:
        console.log('archieve')
        break;
      case 4:
        console.log('add to group')
        break;
      case 5:
        console.log('assign user')
        break;
    }
  }
}
