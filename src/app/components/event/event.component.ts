import { Component, Input } from '@angular/core';
import { IActionState } from '../../client/client.interface';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  public onTypeChanged(type) {
    switch (type.event) {
      case 1:
      this.router.navigate(['/events/edit-event', this.event['id']]);
        break;
      case 2:
        console.log('clone');
        break;
      case 3:
        console.log('archieve');
        break;
      case 4:
        this.modal.show(type.action);
        break;
      case 5:
        console.log('assign user');
        break;
      case 6:
       this.router.navigate(['/events/recap-report', this.event['id']]);
        console.log('recap report');
        break;
      case 7:
        console.log('export crm data');
        break;
      default:
        console.log('default behavior');
    }
  }
}
