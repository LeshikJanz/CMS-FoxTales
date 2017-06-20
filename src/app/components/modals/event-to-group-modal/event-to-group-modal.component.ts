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
  selector: 'event-to-group-modal',
  templateUrl: 'event-to-group-modal.component.html',
  styleUrls: ['event-to-group-modal.component.scss']
})

export class EventToGroupModalComponent implements OnChanges {

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
   * Tags
   *
   * @type {ITag[]}
   */
  public tags: ITag[];

  /**
   * Selected group
   *
   * @type {IEventGroup}
   */
  public selectedGroup: IEventGroup;

  /**
   * Save changes
   *
   * @type {EventEmitter}
   */
  @Output() public save: EventEmitter<any> = new EventEmitter();

  /**
   * Constructor
   *
   * @param {EventService} eventService - event service
   * @param {EventGroupsService} eventGroupService - event group service
   * @param {ToastrService} toastrService - toastr service
   * @return {void}
   */
  constructor(private eventService: EventService,
              private eventGroupService: EventGroupsService,
              private toastrService: ToastrService) {
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
   * Show modal
   *
   * @return {void}
   */
  public show(event: IEvent) {
    this.event = event;
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
   * Lifecycle hook that is called after ngOnInit and after any component's
   * properties change
   *
   * @returns {void}
   */
  public ngOnChanges() {
    this.eventGroupList = this.eventGroups;
  }

  /**
   * Add event to selected group
   *
   * @return {void}
   */
  public addEvent(selectedGroup: IEventGroup) {
    selectedGroup.eventIds = this.selectedGroup.events.map((e: IEvent) => e.id);
    selectedGroup.eventIds.push(this.event.id);

    this.eventGroupService.updateEventGroup(selectedGroup)
      .subscribe(() => {
        this.hide();
        this.toastrService.success('Event group has been updated successfully.');
        this.save.emit();
      });
  }
}
