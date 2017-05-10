import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IArchieveState } from "../../client/client.interface";

/**
 * Drop down select
 */
@Component({
  selector: 'dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss']
})

export class DropDownSelect {
  @Input() options: IArchieveState[];

  @Output() typeChanged: EventEmitter<string> = new EventEmitter();;

  constructor() {}

  public onTypeChanged(value: string) {
    this.typeChanged.emit(value);
  }
}
