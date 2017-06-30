import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITag } from '../tag.interface';
import { EventService } from '../event.service';
import { DateTimePickerModule } from 'ng-pick-datetime';
import * as moment from 'moment';
import { ISwitcher } from '../../components/toggles/switcher/switcher.interface';
import {  } from 'bingmaps/scripts/MicrosoftMaps/Microsoft.Maps.All';
import { UserService } from '../../user/user.service';
import { IUserClient } from '../../user/user-client.interface';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['event-create.component.scss',
    '../../shared/styles/form-element.scss',
    '../../shared/styles/date-picker.scss',
    '../../shared/styles/tag-input.scss',
    '../../shared/styles/calendar.scss'
  ]
})
export class EventCreateComponent implements OnInit, AfterViewInit {
    @ViewChild('buildExperienceModal') public lgModal: ModalDirective;
  public startMomentTime: string;
  public startMomentDate: string;
  public endMomentTime: string;
  public endMomentDate: string;
  public isNotificationEnabled: string;
  public notification: number;
  public notificationOptions: ISwitcher[] = [{id: 1, name: 'Yes'}, {id: 2, name: 'No'}];
  public experienceId: any;

  @ViewChild ('myMap') public myMap;

  /**
   * Event form
   *
   * @type {FormGroup}
   */
  public eventForm: FormGroup;

  /**
   * Clients
   *
   * @type {IUserClient[]}
   */
  public clients: IUserClient[];

  /**
   * Tags
   *
   * @type {ITag[]}
   */
  public tags: ITag[];

  /**
   * Selected Tags
   *
   * @type {ITag[]}
   */
  @Input() public selectedTags: ITag[];

  /**
   * tag-input value
   *
   * @type {string}
   */

  public tagInputValue: string;
  public mapAddress: any;
  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {FormBuilder} formBuilder
   * @param {EventService} event - Event service
   * @param {UserService} userService - User service
   * @returns {void}
   */
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private event: EventService,
              private userService: UserService) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */

  public ngOnInit(): void {

    this.getTags();
    this.getUserClients();
    this.buildEventForm();
  }

  public ngAfterViewInit() {
    let map = this.mapAddress = new Microsoft.Maps.Map(this.myMap.nativeElement, {
      credentials: process.env.BING_KEY
    });

    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', () => {
      let manager = new Microsoft.Maps.AutosuggestManager({ map: map });
      manager.attachAutosuggest('#searchBox', '#searchBoxContainer', (result) => {
        map['address'] = result.formattedSuggestion;
        map['latitude'] = result.location.latitude;
        map['longitude'] = result.location.longitude;

        // Remove previously selected suggestions from the map.
        map.entities.clear();

        // Show the suggestion as a pushpin and center map over it.
        const pin = new Microsoft.Maps.Pushpin(result.location);

        map.entities.push(pin);
        map.setView({ bounds: result.bestView });
      });
    });

    let pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
    let layer = new Microsoft.Maps.Layer();

    layer.add(pushpin);
    map.layers.insert(layer);
  }

  /**
   * Get tags
   *
   * @returns {void}
   */
  public getTags(): void {
    this.event
      .getTags()
      .subscribe((tags: ITag[]) =>
        this.tags = tags
      );
  }

  /**
   * Get user clients
   *
   * @returns {EventCreateComponent} - Component
   */
  public getUserClients(): EventCreateComponent {
    this.userService
      .getClients()
      .subscribe((clients: IUserClient[]) => {
        this.clients = clients;
      });

    return this;
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
   * Add event
   *
   * @param event - Event
   * @returns {void}
   */
  public addEvent(event): void {
    if (event.tags === undefined) {
      event.tags = [];
    }

    event.tags = event.tags.map((tag: ITag) => tag.name || tag.value);

    switch (this.notification) {
      case 1:
        event['sendNotifications'] = true;
        break;
      case 2:
        event['sendNotifications'] = false;
        break;
      default:
        event['sendNotifications'] = true;
        break;
    }
    event.address = this.mapAddress.address;
    event.latitude = this.mapAddress.latitude;
    event.longitude = this.mapAddress.longitude;
    event['startTime'] = moment(this.startMomentDate, 'MMM DD YYYY').format();
    event['endTime'] = moment(this.endMomentDate, 'MMM DD YYYY').format();

    this.event.createEvent(event).subscribe((response) => {
      this.experienceId = response.id;
      this.lgModal.show();
      // this.router.navigate(['/events/events']);
    });
  }

  /**
   * Build user form
   *
   * @returns {UserCreateComponent} - Component
   */
  public buildEventForm(): EventCreateComponent {
    this.eventForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      tags: ['', this.selectedTags],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      clientId: ['', [Validators.required]],
    });

    return this;
  }

  /**
   * Search tags
   *
   * @param {string} value - Value
   * @param {any} target - Tag
   * @returns {boolean}
   */
  public matchingFn(value: string, target: any): boolean {
    if (!target['name']) {
      return false;
    }

    const targetValue = target['name'].toString();

    return targetValue && targetValue
      .toLowerCase()
      .indexOf(value.toLowerCase()) >= 0;
  }

  public hide() {
    this.router.navigate(['/events/events']);
  }
}
