import { Component, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { EventService } from '../../../event/event.service';
import { IEvent } from '../../../event/event.interface';

@Component({
  selector: 'events-to-cur-group-modal',
  templateUrl: 'events-to-cur-group-modal.component.html',
  styleUrls: ['events-to-cur-group-modal.component.scss']
})

export class EventsToCurGroupModalComponent {

  @ViewChild('aeModal') public lgModal: ModalDirective;
  public isModalShown: boolean = false;

  /**
   * Group name where events are added
   *
   * type {any}
   */
  public groupName: string;

  /**
   * Events
   *
   * @type {IEvent[]}
   */
  @Input() public events: IEvent[];

  /**
   * Constructor
   *
   * @param {EventService} eventService - event service
   * @return {void}
   */
  constructor(private eventService: EventService) {
  }

  /**
   * Tag transformer
   *
   * @param {string} tag - Tag
   * @returns {string} - Transformed tag
   */
  public tagTransformer(tag: string): string {
    return tag.replace(/\s/g, '');
  }

  /**
   * Show modal
   *
   * @return {void}
   */
  public show(groupName: string) {
    this.groupName = groupName;
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
}
