import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ITag } from '../tag.interface';
import { EventService } from '../event.service';
import { MOCK_TAGS } from '../tag.mock';
import { DateTimePickerModule } from 'ng-pick-datetime';
import * as moment from 'moment';

@Component({
  selector: 'event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

  public startMomentDate: string;
  public endMomentDate: string;
  public isNotificationEnabled: string;
  public notificationOptions = ['Yes', 'No'];
  public eventName: string;
  public eventAddress: string;
  public eventTags: any;
  public id: number;
  public defaultTags: any[];
  public defaultNotification: any;
  public tags: ITag[];
  private sub: any;

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {FormBuilder} formBuilder
   * @param {EventService} event - Event service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private event: EventService,
    private route: ActivatedRoute
  ) {
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
      console.log(event);
      this.eventName = event.name;
      this.eventAddress = event.address;
      this.startMomentDate = event.startTime;
      this.endMomentDate = event.endTime;
      this.defaultTags = event.tags;
      if (event.sendNotifications === true) {
        this.defaultNotification = this.notificationOptions[0];
      } else {
        this.defaultNotification = this.notificationOptions[1];
      }

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

    if (this.isNotificationEnabled === 'Yes' || this.defaultNotification === 'Yes') {
      this.defaultNotification = true;
    }
    if (this.isNotificationEnabled === 'No' || this.defaultNotification === 'No') {
      this.defaultNotification = false;
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

}