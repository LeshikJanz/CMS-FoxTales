import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event/event.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { IEventGroup } from '../list/event-groups.interaface';
import { EventGroupsService } from '../list/event-groups.service';
import { IEvent, IEventFilter } from '../../event/event.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../client/client.service';
import { IClient } from '../../client/client.interface';
import { FormService } from '../../shared/core/form/form.service';
import { IUserClient } from '../../user/user-client.interface';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'event-group-edit',
  templateUrl: 'event-group-edit.component.html',
  styleUrls: ['event-group-edit.component.scss',
    '../../shared/styles/tag-input.scss',
    '../../shared/styles/form-element.scss']
})

export class EventGroupEditComponent implements OnInit {

  /**
   * Event group form
   *
   * @type {FormGroup}
   */
  public eventGroupForm: FormGroup;

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
   * Client
   *
   * @type {IUserClient}
   */
  public client: IUserClient;

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
   * @returns {void}
   */
  constructor(private eventService: EventService,
              private eventGroupService: EventGroupsService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private clientService: ClientService,
              private userService: UserService) {
  }

  /**
   * Get client by id
   *
   * @param {number} id - Event group id
   * @returns {void}
   */
  public getEventGroup(id: number) {
    this.eventGroupService
      .getEventGroup(id)
      .subscribe((eventGroup: IEventGroup) => {
        if (!eventGroup) {
          return this.router.navigate(['/events/event-groups']);
        }

        this.eventGroup = eventGroup[0];

        this.getUserClients();
        this.getEvents({ clientId: this.eventGroup.clientId });

        FormService.populateForm(this.eventGroup, this.eventGroupForm);
      });
  }

  public ngOnInit() {
    this.buildForm();

    this.route.params.subscribe((params: any) => {
      this.getEventGroup(params['id']);
    });
  }
  
  /**
   * Get user clients
   *
   * @returns {EventCreateComponent} - Component
   */
  public getUserClients(): EventGroupEditComponent {
    this.userService
      .getClients()
      .subscribe((clients: IUserClient[]) => {
        this.clients = clients;
        this.client = this.clients.find((c: IUserClient) => +c.id === this.eventGroup.clientId);
      });

    return this;
  }

  /**
   * Get events
   *
   * @return {void}
   */
  public getEvents(filter: IEventFilter) {
    this.eventService
      .getEvents(filter)
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
  public updateEventGroup() {
    this.eventGroup.eventIds = this.eventGroup.events.map((e: IEvent) => e.id);
    delete this.eventGroup.events;

    this.eventGroupService.updateEventGroup(this.eventGroup)
      .subscribe(() => {
        this.toastrService.success('Event group has been updated successfully.');
        this.router.navigate(['/events/event-groups']);
      });
  }
}
