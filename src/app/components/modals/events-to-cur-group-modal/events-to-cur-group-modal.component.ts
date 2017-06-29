import { Component, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { EventService } from '../../../event/event.service';
import { IEvent, IEventFilter } from '../../../event/event.interface';
import { IEventGroup } from '../../../event-groups/list/event-groups.interaface';
import { EventGroupsService } from '../../../event-groups/list/event-groups.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'events-to-cur-group-modal',
  templateUrl: 'events-to-cur-group-modal.component.html',
  styleUrls: ['events-to-cur-group-modal.component.scss',
    '../../../shared/styles/form-element.scss',
    '../../../shared/styles/tag-input.scss',
  ]
})

export class EventsToCurGroupModalComponent {

  @ViewChild('aeModal') public lgModal: ModalDirective;
  public isModalShown: boolean = false;

  /**
   * Group name where events are added
   *
   * type {any}
   */
  public group: IEventGroup = {
    id: null,
    name: null,
    clientId: null,
    eventIds: [],
    events: null,
    gallery: null
  };

  /**
   * Events
   *
   * @type {IEvent[]}
   */
  public events: IEvent[];

  /**
   * Selected Events
   *
   * @type {IEvent[]}
   */
  @Input() public selectedEvents: IEvent[];

  /**
   * Save changes
   *
   * @type {EventEmitter}
   */
  @Output() public save: EventEmitter<any> = new EventEmitter();

  /**
   * Constructor
   *
   * @param {EventGroupsService} eventGroupService - event group service
   * @param {ToastrService} toastrService - toastr service
   * @param {EventService} eventService - event service
   * @return {void}
   */
  constructor(private eventGroupService: EventGroupsService,
              private toastrService: ToastrService,
              private eventService: EventService) {}

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
  public show(group: IEventGroup) {
    this.selectedEvents = [];
    this.group = group;
    this.getUnusedEvents();
    this.isModalShown = true;
  }

  /**
   * Get unused events (aren't included to any event group)
   *
   * @return {void}
   */
  public getUnusedEvents() {
    const filter: IEventFilter = {
      clientId: this.group.clientId,
      ignoreEventGroupFilter: false
    };

    this.eventService
      .getEvents(filter)
      .subscribe((events: IEvent[]) =>
        this.events = events
      );
  };

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
   * Update event group
   *
   * @return {void}
   */
  public updateGroup() {
    this.group.eventIds = this.group.events.map((e: IEvent) => e.id);
    this.selectedEvents.forEach((e: IEvent) => this.group.eventIds.push(e.id));

    this.eventGroupService.updateEventGroup(this.group)
      .subscribe(() => {
        this.hide();
        this.toastrService.success('Event group has been updated successfully.');
        this.save.emit();
      });
  }
}
