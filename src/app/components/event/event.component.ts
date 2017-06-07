import { Component, Input } from '@angular/core';
import { ITableAction } from '../../shared/table/action.interface';
import { IActionState } from '../../client/client.interface';
import { IEvent } from '../../event/event.interface';

@Component({
  selector: 'event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.scss']
})

export class EventComponent {

  /**
   * Event name
   *
   * @type string
   */
  @Input() public event: any[];

  /**
   * Actions for event
   *
   * @type ITableAction[]
   */
  @Input() public eventActions: ITableAction[];

  /**
   * Object controls Modal state
   *
   * @type {any}
   */
  @Input() public modal: any;

  /**
   * Event name
   *
   * @type string
   */
  @Input() public name: string;

  /**
   * Event date
   *
   * @type Date
   */
  @Input() public date: Date;

  /**
   * Event tags
   *
   * @type [string]
   */
  @Input() public tags: string[] = null;

  /**
   * Event tags
   *
   * @type number
   */
  @Input() public expCount: number = null;

  /**
   * Event status
   *
   * @type number
   * 0 - default, - 1 - fail, 1 - completed
   */
  @Input() public status: number = 0;

  /**
   * is event checked?
   *
   * @type boolean
   */
  public isChecked: boolean = false;

  /**
   * On Add event to group
   *
   * @param {IEvent} event - event
   * @return {void}
   */
  public onAddToGroup(event: IEvent) {
    this.modal.show(event);
  }

  /**
   * On event action changed
   *
   * @param {IEvent} event - event
   * @param {IActionState} action - event action
   * @return {void}
   */
  public onActionChanged(event: IEvent, action: IActionState) {
    if (this[action.callback]) {
      this[action.callback](event);
    }
  }
}
