import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ITag } from '../tag.interface';
import { EventService } from '../event.service';
import { MOCK_TAGS } from '../tag.mock';
import { DateTimePickerModule } from 'ng-pick-datetime';
import * as moment from 'moment';
import { ISwitcher } from '../../components/toggles/switcher/switcher.interface';

@Component({
  selector: 'event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  public startMomentTime: string;
  public startMomentDate: string;
  public endMomentTime: string;
  public endMomentDate: string;
  public isNotificationEnabled: string;
  public notification: number;
  public notificationOptions: ISwitcher[] = [{id: 1, name: 'Yes'}, {id: 2, name: 'No'}];

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
    event.tags = event.tags.map((tag: ITag) => tag.name);

    switch (this.notification) {
      case 1:
        event['sendNotifications'] = true;
        break;
      case 2:
        event['sendNotifications'] = false;
        break;
    }
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
        Validators.required,
        Validators.pattern('^\\S*')
      ]],
      address: ['', [
        Validators.required,
        Validators.pattern('^\\S*')
      ]],
      tags: ['', [
        Validators.required
      ]]
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
