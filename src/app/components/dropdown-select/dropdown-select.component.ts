import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IActionState } from '../../client/client.interface';

/**
 * Drop down select
 */
@Component({
  selector: 'dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss']
})

export class DropDownSelectComponent {
  @Input() public options: IActionState[];

  @Output() public typeChanged: EventEmitter<string> = new EventEmitter();

  public onTypeChanged(value: string) {
    this.typeChanged.emit(value);
  }
}
