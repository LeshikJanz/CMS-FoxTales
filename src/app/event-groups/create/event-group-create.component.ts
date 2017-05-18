import { Component, OnInit } from '@angular/core';
import { EventService } from "../../event/event.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ITag } from "../../event/tag.interface";
import { IEventGroup } from "../list/event-groups.interaface";
import { EventGroupsService } from "../list/event-groups.service";
import { IEvent } from "../../event/event.interface";

@Component({
  selector: 'event-group-create',
  templateUrl: 'event-group-create.component.html',
  styleUrls: ['event-group-create.component.scss']
})

export class EventGroupCreateComponent implements OnInit {

  /**
   * Constructor
   *
   * @param {FormBuilder} formBuilder - form builder
   * @param {EventService} eventService - event service
   * @returns {void}
   */
  constructor(private formBuilder: FormBuilder,
              private eventService: EventService
  ) {}

  ngOnInit() {
    this.buildEventGroupForm();
    this.getEvents();
  }

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
   * Gallery toggle options
   *
   * @type {string}
   * */
  public galleryOptions = ['Yes', 'No'];

  /**
   * Get tags
   *
   * @returns {void}
   */
  public getTags(): void {
    this.eventService
      .getTags()
      .subscribe((tags: ITag[]) => this.tags = tags);
  }

  /**
   * Get event groups
   *
   * @return {void}
   * */
  public getEvents() {
    this.eventService
      .getEvents()
      .subscribe((events: IEvent[]) => {
        this.events = events.filter(e => e.name);
        console.log("this.events");
        console.log(this.events);
      }
    )
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
   * Create new Event group
   *
   * @returns {ClientCreateComponent} - Component
   */
  public addEventGroup(eventGroup: IEventGroup){
    console.log("eventGroup");
    console.log(eventGroup);
  }

  /**
   * Build client form
   *
   * @returns {ClientCreateComponent} - Component
   */
  public buildEventGroupForm(): EventGroupCreateComponent {
    this.eventGroupForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      groupGallery: ['', [
        Validators.required
      ]],
      events: ['', [
        Validators.required
      ]],
    });

    return this;
  }
}
