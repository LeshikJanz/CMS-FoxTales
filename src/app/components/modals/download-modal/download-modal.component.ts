import {
  Component, Input, ViewChild, OnInit,
  OnChanges, Output, EventEmitter
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ITag } from '../../../event/tag.interface';
import { EventService } from '../../../event/event.service';
import { IEventGroup } from '../../../event-groups/list/event-groups.interaface';
import { IEvent } from '../../../event/event.interface';
import { EventGroupsService } from '../../../event-groups/list/event-groups.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'download-modal',
  templateUrl: 'download-modal.component.html',
  styleUrls: ['download-modal.component.scss']
})

export class DownloadModalComponent {

  @ViewChild('atgModal') public lgModal: ModalDirective;
  public isModalShown: boolean = false;

  /**
   * Event
   *
   * type {IEvent}
   */
  public event: IEvent;

  /**
   * Event groups
   *
   * type {IEventGroup[]}
   */
  @Input() public eventGroups: IEventGroup[];

  /**
   * Filtered event groups
   *
   * type {IEventGroup[]}
   */
  public eventGroupList: IEventGroup[];

  /**
   * Search value
   *
   * type {string}
   */
  public search: string = '';

  /**
   * Search value
   *
   * type {string}
   */
  public options: string[] = ['Filtered Gallery Result', 'Entire Gallery'];

  /**
   * Save changes
   *
   * @type {EventEmitter}
   */
  @Output() public save: EventEmitter<any> = new EventEmitter();

  /**
   * Constructor
   *
   * @return {void}
   */
  constructor() {
  }

  /**
   * Show modal
   *
   * @return {void}
   */
  public show() {
    this.isModalShown = true;
  }

  /**
   * Hide modal
   *
   * @return {void}
   */
  public hide() {
    this.lgModal.hide();
  }

  /**
   * On close modal
   *
   * @return {void}
   */
  public onHidden() {
    this.isModalShown = false;
  }

  /**
   * On switch type
   *
   * @return {void}
   */
  public onSwitch(event: string) {
    console.log('onSwitch');
    console.log(event);
  }

  /**
   * Run download
   *
   * @return {void}
   */
  public startDownload() {
  }
}
