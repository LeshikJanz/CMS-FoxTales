import { Component, OnChanges, Output, EventEmitter, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";
import { ITag } from "../../../event/tag.interface";
import { EventService } from "../../../event/event.service";

@Component({
  selector: 'add-to-group-modal',
  templateUrl: 'add-to-group-modal.component.html',
  styleUrls: ['add-to-group-modal.component.scss']
})

export class AddToGroupModalComponent implements OnInit {

  /**
   * Constructor
   *
   * @param {EventService} eventService - event service
   * @return {void}
   * */
  constructor(private eventService: EventService){}

  @ViewChild('atgModal') public lgModal: ModalDirective;
  isModalShown: boolean = false;

  /**
   * Group name where events are added
   *
   * type {any}
   * */
  @Input() groupName: any;

  /**
   * Tags
   *
   * @type {ITag[]}
   */
  public tags: ITag[];

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
   * Tag transformer
   *
   * @param {string} tag - Tag
   * @returns {string} - Transformed tag
   */
  public tagTransformer(tag: string): string {
    return tag.replace(/\s/g, '');
  }

  /**
   * On Scroll event
   *
   * @returns {void}
   * */
  public onScroll() {
    console.log("onScroll");
  }

  /**
   * Show modal
   *
   * @return {void}
   * */
  show() {
    this.isModalShown = true;
  }

  /**
   * Hide modal
   *
   * @return {void}
   * */
  hide() {
    this.lgModal.hide();
  }

  /**
   * On close modal
   *
   * @return {void}
   * */
  onHidden() {
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
