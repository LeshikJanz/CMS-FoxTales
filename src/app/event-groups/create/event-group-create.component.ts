import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from "../../event/event.interface";
import { EventGroupsService } from "./event-groups.service";
import { IEventGroup } from "./event-groups.interaface";
import { EventService } from "../../event/event.service";
import { IActionState } from "../../client/client.interface";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ITag } from "../../event/tag.interface";

@Component({
  selector: 'event-group-create',
  templateUrl: 'event-group-create.component.html',
  styleUrls: ['event-group-create.component.scss']
})

export class EventGroupCreateComponent implements OnInit {

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @returns {void}
   */
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private eventService: EventService
  ) {}

  ngOnInit() {
    this.buildEventGroupForm();
    this.getTags();
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
   * Tag transformer
   *
   * @param {string} tag - Tag
   * @returns {string} - Transformed tag
   */
  public tagTransformer(tag: string): string {
    return tag.replace(/\s/g, '');
  }

  /**
   * Build client form
   *
   * @returns {ClientCreateComponent} - Component
   */
  public buildEventGroupForm(): EventGroupCreateComponent {
    this.eventGroupForm = this.formBuilder.group({
      groupName: ['', [
        Validators.required
      ]],
      groupGallery: ['', [
        Validators.required
      ]],
      tags: ['', [
        Validators.required
      ]],
    });

    return this;
  }

  public addEventGroup(group) {

  }
}
