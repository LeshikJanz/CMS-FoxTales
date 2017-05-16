import { Component, Input } from '@angular/core';
import { IActionState } from "../../client/client.interface";

@Component({
  selector: 'event-group',
  templateUrl: 'event-group.component.html',
  styleUrls: [ 'event-group.component.scss' ]
})

export class EventGroupComponent {

  public isOpen: boolean = false;

  public eventActions: IActionState[] = [
    { id: 1, action: 'SETTINGS' },
    { id: 2, action: 'CLONE' },
    { id: 3, action: 'ARCHIEVE' },
    { id: 4, action: 'ADD TO GROUP' },
    { id: 5, action: 'ASSIGN USERS' },
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
