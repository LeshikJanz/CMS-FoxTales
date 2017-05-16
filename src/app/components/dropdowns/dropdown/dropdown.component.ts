import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IActionState } from '../../../client/client.interface';

/**
 * Drop down menu
 */
@Component({
  selector: 'dropdown',
  templateUrl: 'dropdown.component.html',
  styleUrls: ['dropdown.component.scss']
})

export class DropDownComponent {
  @Input() public options: IActionState[];

  @Input() public size: string = 'small';

  @Input() public title: string = 'DropDown';

  @Output() public typeChanged: EventEmitter<number> = new EventEmitter();

  public curentAction = null;

  public onTypeChanged(option: IActionState) {
    this.curentAction = option.action;
    this.typeChanged.emit(option.id);
  }
}
