import { Component, Input, ViewChild, OnInit, OnChanges } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ITag } from '../../../event/tag.interface';
import { EventService } from '../../../event/event.service';
import { IEventGroup } from '../../../event-groups/list/event-groups.interaface';
import { IEvent } from '../../../event/event.interface';

@Component({
  selector: 'event-to-group-modal',
  templateUrl: 'event-to-group-modal.component.html',
  styleUrls: ['event-to-group-modal.component.scss']
})

export class EventToGroupModalComponent implements OnInit, OnChanges {

  @ViewChild('atgModal') public lgModal: ModalDirective;
  public isModalShown: boolean = false;

  /**
   * Group name where events are added
   *
   * type {any}
   */
  public groupName: any;

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
   * Tags
   *
   * @type {ITag[]}
   */
  public tags: ITag[];

  /**
   * Selected group
   *
   * @type {string}
   */
  public selectedGroup: string;

  /**
   * Constructor
   *
   * @param {EventService} eventService - event service
   * @return {void}
   */
  constructor(private eventService: EventService) {
  }

  /**
   * Search handler
   *
   * @param {string} value
   * @returns {void}
   */
  public onSearchChange(value: string): void {
    this.eventGroupList = this.eventGroups.filter(
      (eg: IEventGroup) => eg.name.toLowerCase().indexOf(value) >= 0);
  }

  /**
   * Get tags
   *
   * @returns {void}
   */
  public getTags(): void {
    this.eventService
      .getTags()
      .subscribe((tags: ITag[]) => this.tags = tags);
  }

  /**
   * Show modal
   *
   * @return {void}
   */
  public show(event: IEvent) {
    this.groupName = event.name;
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
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit() {
    this.getTags();
  }

  public ngOnChanges() {
    this.eventGroupList = this.eventGroups;
  }
}
