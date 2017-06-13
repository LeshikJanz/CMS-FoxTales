import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IActionState } from '../../client/client.interface';
import { Router } from '@angular/router';
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
   * @type IActionState[]
   */
  @Input() public eventActions: IActionState[];

  /**
   * Object controls Modal state
   *
   * @type {any}
   */
  @Input() public atgModal: any;

  @Input() public deleteModal: any;

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
   * Clone event emitter
   *
   * @type {EventEmitter}
   */
  @Output()
  public cloneAction: EventEmitter<any> = new EventEmitter();

  /**
   * is event checked?
   *
   * @type boolean
   */
  public isChecked: boolean = false;

  constructor(private router: Router) {}

  /**
   * On Add event to group
   *
   * @param {IEvent} event - event
   * @return {void}
   */
  public onAddToGroup(event: IEvent) {
    this.atgModal.show(event);
  }

  /**
   * On Edit event
   *
   * @return {void}
   */
  public onEdit() {
    this.router.navigate(['/events/edit-event', this.event['id']]);
  }

  /**
   * On Delete event
   *
   * @return {void}
   */
  public onDelete(event) {
    // console.log(event)
    this.deleteModal.show(event);
  }

  /**
   * On Recap report
   *
   * @return {void}
   */
  public onRecapReport() {
    this.router.navigate(['/events/recap-report', this.event['id']]);
  }

  public onClone(event: IEvent): void {
    this.cloneAction.emit(event);
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
