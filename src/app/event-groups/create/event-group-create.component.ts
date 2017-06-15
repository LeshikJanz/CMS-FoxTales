import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event/event.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ITag } from '../../event/tag.interface';
import { IEventGroup } from '../list/event-groups.interaface';
import { EventGroupsService } from '../list/event-groups.service';
import { IEvent, IEventFilter } from '../../event/event.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../../shared/core/auth/permission.service';

@Component({
  selector: 'event-group-create',
  templateUrl: 'event-group-create.component.html',
  styleUrls: ['event-group-create.component.scss']
})

export class EventGroupCreateComponent implements OnInit {

  /**
   * Event group form
   *
   * @type {FormGroup}
   */
  public eventGroupForm: FormGroup;

  /**
   * Tags
   *
   * @type {ITag[]}
   */
  public tags: ITag[];

  /**
   * Events
   *
   * @type {IEvent[]}
   */
  public events: IEvent[];

  /**
   * Event group
   *
   * @type {IEventGroup}
   */
  public eventGroup: IEventGroup = {
    id: null,
    name: null,
    clientId: null,
    eventIds: null,
    events: [],
    gallery: null
  };

  /**
   * Gallery toggle options
   *
   * @type {string}
   */
  public galleryOptions = [{ id: 1, name: 'Yes' }, { id: 2, name: 'No' }];

  /**
   * Is Gallery Enabled (yes/no)
   *
   * @type {string}
   */

  public isGalleryEnabled: string;

  /**
   * tag-input value
   *
   * @type {string}
   */

  public tagInputValue: string;

  /**
   * Constructor
   *
   * @param {FormBuilder} formBuilder - form builder
   * @param {EventService} eventService - event service
   * @returns {void}
   */
  constructor(private eventService: EventService,
              private eventGroupService: EventGroupsService,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
  }

  /**
   * Get events
   *
   * @return {void}
   */
  public getEvents() {
    const filter: IEventFilter = {
      ignoreEventGroupFilter: false
    };

    this.eventService
      .getEvents(filter)
      .subscribe((events: IEvent[]) =>
        this.events = events.filter((e: IEvent) => !!e.name)
      );
  }

  public ngOnInit() {
    this.getEvents();
    this.buildForm();
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
   * Build eventGroup form
   *
   * @returns {ClientCreateComponent} - Component
   */
  public buildForm(): EventGroupCreateComponent {
    this.eventGroupForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      events: ['']
    });

    return this;
  }

  /**
   * Create new Event group
   *
   * @returns {void}
   */
  public addEventGroup(eventGroup: IEventGroup) {
    if (eventGroup.events) {
      eventGroup.eventIds = eventGroup.events.map((e: IEvent) => e.id);
    }
    delete eventGroup.events;
    eventGroup.clientId = PermissionService.clientId;

    this.eventGroupService.addEventGroup(eventGroup)
      .subscribe(() => {
        this.toastrService.success('Event group has been added successfully.');
        this.router.navigate(['/events/event-groups']);
      });
  }
}
