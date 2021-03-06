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
import { IUserClient } from '../../user/user-client.interface';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'event-group-create',
  templateUrl: 'event-group-create.component.html',
  styleUrls: ['event-group-create.component.scss',
    '../../shared/styles/form-element.scss',
    '../../shared/styles/tag-input.scss']
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
   * Loading spinner
   *
   * @type {boolean}
   */
  public loading: boolean = false;

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
   * Clients
   *
   * @type {IUserClient[]}
   */
  public clients: IUserClient[];

  /**
   * Constructor
   *
   * @param {FormBuilder} formBuilder - form builder
   * @param {EventService} eventService - event service
   * @param {EventGroupsService} eventGroupService - event group service
   * @param {Router} router - router
   * @param {ToastrService} toastrService - toastr service
   * @param {UserService} userService - user service
   * @returns {void}
   */
  constructor(private eventService: EventService,
              private eventGroupService: EventGroupsService,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private userService: UserService) {
  }

  /**
   * Get events
   *
   * @return {void}
   */
  public getEvents(clientFilter: IEventFilter = {}) {
    const filter: IEventFilter = {
      ignoreEventGroupFilter: false,
      sortBy: 'ClientID',
      ...clientFilter
    };

    this.eventService
      .getEvents(filter)
      .subscribe((events: IEvent[]) => {
          this.events = events.filter((e: IEvent) => !!e.name)
          this.loading = false;
        }
      );
  }

  public ngOnInit() {
    this.getUserClients();
    this.buildForm();
  }

  /**
   * Get user clients
   *
   * @returns {EventCreateComponent} - Component
   */
  public getUserClients(): EventGroupCreateComponent {
    this.userService
      .getClients()
      .subscribe((clients: IUserClient[]) => {
        this.clients = clients;
      });

    return this;
  }

  /**
   * On client access change
   * @param {any} event - even
   *
   * @returns {void}
   */
  public onClientAccessChange(event: any) {
    this.loading = true;
    this.eventGroupForm.get('clientId').setValue(event.id);
    this.eventGroupForm.get('events').setValue('');
    this.getEvents({ clientId: event.id });
  }

  /**
   * Show warning
   *
   * @returns {void}
   */
  public showWarning() {
    this.toastrService.warning('Select Client Access first');
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
      events: [''],
      clientId: ['', [Validators.required]]
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

    this.eventGroupService.addEventGroup(eventGroup)
      .subscribe(() => {
        this.toastrService.success('Event group has been added successfully.');
        this.router.navigate(['/events/event-groups']);
      });
  }
}
