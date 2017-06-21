import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PermissionService } from '../../../shared/core';
import { ITableAction } from '../../../shared/table/action.interface';

/**
 * Drop down menu
 */
@Component({
  selector: 'table-dropdown',
  templateUrl: 'table-dropdown.component.html',
  styleUrls: ['table-dropdown.component.scss']
})

export class TableDropDownComponent implements OnInit {
  @Input() public options: ITableAction[];

  @Input() public size: string = 'small';

  @Input() public title: string = 'DropDown';

  @Output() public typeChanged: EventEmitter<ITableAction> = new EventEmitter();

  constructor(private permission: PermissionService) {
  }

  public ngOnInit(): void {
    if (this.options) {
      // console.log('this.options');
      // console.log(this.options);

      this.options = this.options.filter((option: ITableAction) => {
        if (option.acl) {
          return this.permission.isAllowed(option.acl);
        }

        return true;
      });
    }
  }


  public onTypeChanged(elem: ITableAction) {
    this.typeChanged.emit(elem);
  }
}
