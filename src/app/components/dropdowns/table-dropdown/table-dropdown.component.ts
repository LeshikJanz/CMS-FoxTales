import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITableAction } from '../../../shared/table/action.interface';

/**
 * Drop down menu
 */
@Component({
  selector: 'table-dropdown',
  templateUrl: 'table-dropdown.component.html',
  styleUrls: ['table-dropdown.component.scss']
})

export class TableDropDownComponent {
  @Input() public options: ITableAction[];

  @Input() public size: string = 'small';

  @Input() public title: string = 'DropDown';

  @Output() public typeChanged: EventEmitter<number> = new EventEmitter();

  public onTypeChanged(id: number) {
    this.typeChanged.emit(id);
  }
}
