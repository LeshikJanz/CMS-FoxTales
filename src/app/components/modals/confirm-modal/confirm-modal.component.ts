import {
  Component, Input, ViewChild, OnInit,
  OnChanges, Output, EventEmitter
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ITag } from '../../../event/tag.interface';
import { EventService } from '../../../event/event.service';
import { IEventGroup } from '../../../event-groups/list/event-groups.interaface';
import { IEvent } from '../../../event/event.interface';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'confirm-modal',
  templateUrl: 'confirm-modal.component.html',
  styleUrls: ['confirm-modal.component.scss']
})

export class ConfirmModalComponent {

  @ViewChild('confirmModal') public cModal: ModalDirective;
  public isModalShown: boolean = false;

  /**
   * Confirmation message
   *
   * @type {string}
   */
  @Input() message: string = '';

  /**
   * Header message
   *
   * @type {string}
   */
  @Input() title: string = '';

  /**
   * Confirm action
   *
   * @type {EventEmitter}
   */
  @Output() public confirm: EventEmitter<any> = new EventEmitter();

  /**
   * Constructor
   *
   * @param {ToastrService} toastrService - toastr service
   * @return {void}
   */
  constructor(private toastrService: ToastrService) {
  }

  /**
   * Show modal
   *
   * @return {void}
   */
  public show() {
    this.cModal.show();
    this.isModalShown = true;
  }

  /**
   * Hide modal
   *
   * @return {void}
   */
  public hide() {
    this.cModal.hide();
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
   * On confirm
   *
   * @return {void}
   */
  public onConfirm() {
    this.confirm.emit();
  }
}
