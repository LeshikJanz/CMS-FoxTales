import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ITag } from '../tag.interface';
import { EventService } from '../event.service';
import { MOCK_TAGS } from '../tag.mock';


@Component({
  selector: 'event-create',
  templateUrl: './event-create.component.html',
  styleUrls: [ './event-create.component.scss' ]
})
export class EventCreateComponent implements OnInit {
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
   * Constructor
   *
   * @param {Router} router - Router
   * @param {FormBuilder} formBuilder
   * @param {EventService} event - Event service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private event: EventService
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
   * Add event
   *
   * @param event - Event
   * @returns {void}
   */
  public addEvent(event): void {
    event.tags = event.tags.map((tag: ITag) => tag.name);
    console.log(event);
  }

  /**
   * Build user form
   *
   * @returns {UserCreateComponent} - Component
   */
  public buildEventForm(): EventCreateComponent {
    this.eventForm = this.formBuilder.group({
      eventName: ['', [
        Validators.required
      ]],
      location: ['', [
        Validators.required
      ]],
      tags: ['', [
        Validators.required
      ]]
    });

    return this;
  }
}
