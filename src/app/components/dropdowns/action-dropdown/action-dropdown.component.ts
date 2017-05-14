import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IActionState } from '../../../client/client.interface';

/**
 * Drop down action menu
 */
@Component({
  selector: 'action-dropdown',
  templateUrl: 'action-dropdown.component.html',
  styleUrls: ['action-dropdown.component.scss']
})

export class ActionDropDownComponent {
  @Input() public options: IActionState[];

  @Output() public typeChanged: EventEmitter<number> = new EventEmitter();

  public onTypeChanged(id: number) {
    this.typeChanged.emit(id);
  }
}
