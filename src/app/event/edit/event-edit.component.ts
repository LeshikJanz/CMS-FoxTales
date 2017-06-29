import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { ITag } from '../tag.interface';
import { EventService } from '../event.service';
import { DateTimePickerModule } from 'ng-pick-datetime';
import * as moment from 'moment';
import { ISwitcher } from '../../components/toggles/switcher/switcher.interface';
import {} from 'bingmaps/scripts/MicrosoftMaps/Microsoft.Maps.All';

@Component({
  selector: 'event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss',
    '../../shared/styles/form-element.scss',
    '../../shared/styles/date-picker.scss',
    '../../shared/styles/tag-input.scss'
  ]
})
export class EventEditComponent implements OnInit {
  @ViewChild('myMap') public myMap;
  public startMomentDate: string;
  public endMomentDate: string;
  public notification: number;
  public isNotificationEnabled: string;
  public notificationOptions: ISwitcher[] = [{ id: 1, name: 'Yes' }, { id: 2, name: 'No' }];
  public eventName: string;
  public eventAddress: string;
  public eventTags: any;
  public id: number;
  public defaultTags: any[];
  public defaultNotification: any;
  public tags: ITag[];
  public mapAddress: any;
  private sub: any;

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {FormBuilder} formBuilder
   * @param {EventService} event - Event service
   * @returns {void}
   */
  constructor(private router: Router,
              private event: EventService,
              private route: ActivatedRoute) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.getTags();
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getEvent(this.id);
    });
  }

  public getEvent(id) {
    this.event.getEvent(id).subscribe((event) => {
      this.eventName = event.name;
      this.eventAddress = event.address;
      this.startMomentDate = moment(event.startTime).format('MMM DD, YYYY');
      this.endMomentDate = moment(event.endTime).format('MMM DD, YYYY');
      this.defaultTags = event.tags;
      if (event.sendNotifications === true) {
        this.defaultNotification = this.notificationOptions[0].id;
      } else {
        this.defaultNotification = this.notificationOptions[1].id;
      }
      let map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
        credentials: process.env.BING_KEY
      });

      let searchRequest = {
        where: this.eventAddress,
        callback: (results) => {
          if (results && results.results && results.results.length > 0) {
            let pin = new Microsoft.Maps.Pushpin(results.results[0].location);
            map.entities.push(pin);
            map.setView({ bounds: results.results[0].bestView });
          }
        }
      };

      Microsoft.Maps.loadModule('Microsoft.Maps.Search', () => {
        map.entities.clear();
        let searchManager = new Microsoft.Maps.Search.SearchManager(map);
        searchManager.geocode(searchRequest);
      });

      Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', () => {
        let manager = new Microsoft.Maps.AutosuggestManager({ map: map });
        manager.attachAutosuggest('#searchBox', '#searchBoxContainer', (result) => {

          map['address'] = result.formattedSuggestion;
          this.eventAddress = result.formattedSuggestion;
          // map['latitude'] = result.location.latitude;
          // map['longitude'] = result.location.longitude;

          // Remove previously selected suggestions from the map.
          map.entities.clear();

          // Show the suggestion as a pushpin and center map over it.
          const pin = new Microsoft.Maps.Pushpin(result.location);

          map.entities.push(pin);
          map.setView({ bounds: result.bestView });
        });
      });
      // let location =
      let pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
      let layer = new Microsoft.Maps.Layer();

      layer.add(pushpin);
      map.layers.insert(layer);
      map.setView({ center: map.getCenter() });

    });
  }

  public editEvent() {
    this.defaultTags = this.defaultTags.map((tag: ITag) => {
      if (tag.name) {
        return tag.name;
      } else {
        return tag;
      }
    });

    switch (this.notification) {
      case 1:
        this.defaultNotification = true;
        break;
      case 2:
        this.defaultNotification = false;
        break;
    }

    this.event.updateEvent({
      id: this.id,
      name: this.eventName,
      address: this.eventAddress,
      startTime: this.startMomentDate,
      endTime: this.endMomentDate,
      tags: this.defaultTags,
      sendNotifications: this.defaultNotification

    }).subscribe((event) => {
      console.log(event);
      this.router.navigate(['/events/events']);
    });
  }

  /**
   * Get tags
   *
   * @returns {void}
   */
  public getTags(): void {
    this.event
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
