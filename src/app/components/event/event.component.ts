import { Component, Input } from '@angular/core';
import { IActionState } from '../../client/client.interface';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: [ './event.component.scss' ]
})

export class EventComponent {

  public eventActions: IActionState[] = [
    { id: 1, action: 'SETTINGS' },
    { id: 2, action: 'CLONE' },
    { id: 3, action: 'ARCHIEVE' },
    { id: 4, action: 'ADD TO GROUP' },
    { id: 5, action: 'ASSIGN USERS' },
  ];

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

  public onTypeChanged() {
    console.log('onTypeChanged');
  }
}