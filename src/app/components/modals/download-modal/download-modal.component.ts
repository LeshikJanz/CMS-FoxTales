import {
  Component, Input, ViewChild, Output, EventEmitter
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { IEvent } from '../../../event/event.interface';

@Component({
  selector: 'download-modal',
  templateUrl: 'download-modal.component.html',
  styleUrls: ['download-modal.component.scss']
})

export class DownloadModalComponent {

  @ViewChild('aeModal') public lgModal: ModalDirective;
  public isModalShown: boolean = false;

  /**
   * is email sent?
   *
   * type {boolean}
   */
  public isEmailSent: boolean = false;

  /**
   * Event
   *
   * type {IEvent}
   */
  public event: IEvent;

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
    this.isEmailSent = false;
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
    this.isEmailSent = true;
  }
}
