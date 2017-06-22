import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ITag } from '../tag.interface';
import { EventService } from '../event.service';
import { MOCK_TAGS } from '../tag.mock';
import { DateTimePickerModule } from 'ng-pick-datetime';
import * as moment from 'moment';
import { ISwitcher } from '../../components/toggles/switcher/switcher.interface';
import {  } from 'bingmaps/scripts/MicrosoftMaps/Microsoft.Maps.All';

@Component({
  selector: 'event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['event-create.component.scss',
    '../../shared/styles/form-element.scss']
})
export class EventCreateComponent implements OnInit {
  public startMomentTime: string;
  public startMomentDate: string;
  public endMomentTime: string;
  public endMomentDate: string;
  public isNotificationEnabled: string;
  public notification: number;
  public notificationOptions: ISwitcher[] = [{id: 1, name: 'Yes'}, {id: 2, name: 'No'}];

  @ViewChild ('myMap') public myMap;

  /**
   * Event form
   *
   * @type {FormGroup}
   */
  public eventForm: FormGroup;

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
   * @returns {void}
   */
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private event: EventService) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */

  public ngOnInit(): void {
    this.getTags();
    this.buildEventForm();

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

    event.tags = event.tags.map((tag: ITag) => tag.name);

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
    event['startTime'] = moment(this.startMomentDate, 'MMM DD').format();
    event['endTime'] = moment(this.endMomentDate, 'MMM DD').format();

    this.event.createEvent(event).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/events/events']);
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
      endDate: ['', [Validators.required]]
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
}
