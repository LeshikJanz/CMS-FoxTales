import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IActionState } from '../../../client/client.interface';

/**
 * Drop down action menu
 */
@Component({
  selector: 'group-dropdown',
  templateUrl: 'group-dropdown.component.html',
  styleUrls: ['group-dropdown.component.scss']
})

export class GroupDropDownComponent {
  @Input() public options: IActionState[];

  @Output() public typeChanged: EventEmitter<any> = new EventEmitter();

  public onTypeChanged(option: any) {
    this.typeChanged.emit(option);
  }
}
