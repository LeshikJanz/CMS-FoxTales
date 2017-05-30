import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event/event.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ITag } from '../../event/tag.interface';
import { IEventGroup } from '../list/event-groups.interaface';
import { EventGroupsService } from '../list/event-groups.service';
import { IEvent } from '../../event/event.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../../shared/core/auth/permission.service';

@Component({
  selector: 'event-group-edit',
  templateUrl: 'event-group-edit.component.html',
  styleUrls: ['event-group-edit.component.scss']
})

export class EventGroupEditComponent implements OnInit {

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
   * Event group
   *
   * @type {IEventGroup}
   */
  public eventGroup: IEventGroup = {
    id: null,
    name: null,
    clientId: null,
    eventIds: null,
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
   * Gallery toggle options
   *
   * @type {string}
   */
  public galleryOptions = ['Yes', 'No'];

  /**
   * Is Gallery Enabled (yes/no)
   *
   * @type {string}
   */

  public isGalleryEnabled: string;

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
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
  }

  /**
   * Get client by id
   *
   * @param {number} id - Event group id
   * @returns {void|Promise<boolean>}
   */
  public getEventGroup(id: number): void|Promise<boolean> {
    this.eventGroupService
      .getEventGroup(id)
      .subscribe((eventGroup: IEventGroup) => {
        if (!eventGroup) {
          return this.router.navigate(['/events/event-groups']);
        }

        this.eventGroup = eventGroup[0];
        this.eventGroup.id = id;
      });
  }

  public ngOnInit() {
    this.buildForm();
    this.getEvents();

    this.route.params.subscribe((params: any) => {
      this.getEventGroup(params['id']);
    });
  }

  /**
   * Get events
   *
   * @return {void}
   */
  public getEvents() {
    this.eventService
      .getEvents()
      .subscribe((events: IEvent[]) =>
        this.events = events.filter((e: IEvent) => !!e.name)
      );
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
   * @returns {EventGroupEditComponent} - Component
   */
  public buildForm(): EventGroupEditComponent {
    this.eventGroupForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      events: ['']
    });

    return this;
  }

  /**
   * Update Event group
   *
   * @returns {void}
   */
  public updateEventGroup(eventGroup: IEventGroup) {
    eventGroup.eventIds = eventGroup.events.map((e: IEvent) => e.id);

    this.eventGroupService.updateEventGroup(this.eventGroup)
      .subscribe(() => {
        this.toastrService.success('Event group has been updated successfully.');
        this.router.navigate(['/events/event-groups']);
      });
  }
}
