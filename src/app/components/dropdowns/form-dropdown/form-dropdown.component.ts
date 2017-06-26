import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { PermissionService } from '../../../shared/core';
import { IActionState } from '../../../client/client.interface';

/**
 * Drop down menu
 */
@Component({
  selector: 'form-dropdown',
  templateUrl: 'form-dropdown.component.html',
  styleUrls: ['form-dropdown.component.scss']
})

export class FormDropDownComponent implements OnInit, OnChanges {
  @Input() public options: any[];

  @Input() public title: string = 'DropDown';

  @Output() public typeChanged: EventEmitter<IActionState> = new EventEmitter();

  @Input() public active: any = null;

  public currentAction: string = null;

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

  public ngOnChanges() {
    if (this.active) {
      console.log('this.active');
      console.log(this.active);
      this.onTypeChanged(this.active);
      // this.currentAction = this.active.action || this.active.name;
    }
  }

  public onTypeChanged(option: any) {
    this.currentAction = option.action || option.name;
    this.typeChanged.emit(option);
  }
}
