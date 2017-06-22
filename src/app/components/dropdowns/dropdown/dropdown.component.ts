import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PermissionService } from '../../../shared/core';
import { IActionState } from '../../../client/client.interface';

/**
 * Drop down menu
 */
@Component({
  selector: 'dropdown',
  templateUrl: 'dropdown.component.html',
  styleUrls: ['dropdown.component.scss']
})

export class DropDownComponent implements OnInit {
  @Input() public options: IActionState[];

  @Input() public size: string = 'small';

  @Input() public title: string = 'DropDown';

  @Output() public typeChanged: EventEmitter<IActionState> = new EventEmitter();

  @Input() public curentAction = null;

  constructor(private permission: PermissionService) {
  }

  public ngOnInit(): void {
    if (this.options) {
      this.options = this.options.filter((option: IActionState) => {
        if (option.acl) {
          return this.permission.isAllowed(option.acl);
        }

        return true;
      });
    }
  }

  public onTypeChanged(option: IActionState) {
    this.curentAction = option.action;
    this.typeChanged.emit(option);
  }
}
