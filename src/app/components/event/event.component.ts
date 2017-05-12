import { Component, Input } from '@angular/core';
import { IActionState } from "../../client/client.interface";

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: [ './event.component.scss' ]
})

export class EventComponent {

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

  public eventActions: IActionState[] = [
  { id: 1, state: 'SETTINGS'},
  { id: 2, state: 'CLONE'},
  { id: 3, state: 'ARCHIEVE'},
  { id: 4, state: 'ADD TO GROUP'},
  { id: 5, state: 'ASSIGN USERS'},
]
}
