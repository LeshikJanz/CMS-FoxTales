import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ITag } from '../../../event/tag.interface';
import { EventService } from '../../../event/event.service';
import { IEventGroup } from '../../../event-groups/list/event-groups.interaface';
import { IEvent } from '../../../event/event.interface';
import { MOCK_TAGS } from "../../../event/tag.mock";

@Component({
  selector: 'event-to-group-modal',
  templateUrl: 'event-to-group-modal.component.html',
  styleUrls: ['event-to-group-modal.component.scss']
})

export class EventToGroupModalComponent implements OnInit {

  @ViewChild('atgModal') public lgModal: ModalDirective;
  public isModalShown: boolean = false;

  /**
   * Group name where events are added
   *
   * type {any}
   */
  @Input() public groupName: any;

  /**
   * Event groups
   *
   * type {IEventGroup[]}
   */
  @Input() public eventGroups: IEventGroup[];

  /**
   * Tags
   *
   * @type {ITag[]}
   */
  public tags: ITag[];

  /**
   * Selected groups
   *
   * @type {string[]}
   */
  public selectedGroups: string[];

  /**
   * Constructor
   *
   * @param {EventService} eventService - event service
   * @return {void}
   */
  constructor(private eventService: EventService) {
  }

  /**
   * Get tags
   *
   * @returns {void}
   */
  public getTags(): void {
    // 19.05
    // this.eventService
    //   .getTags()
    //   .subscribe((tags: ITag[]) => this.tags = tags);
    this.tags = MOCK_TAGS;
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
  public show(event: IEvent) {
    console.log(event);
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

    if (this.groupName == null) {
      throw new Error("Attribute 'groupName' is required");
    }
  }
}
