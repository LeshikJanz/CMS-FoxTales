import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from "../../event/event.interface";
import { EventGroupsService } from "./event-groups.service";
import { IEventGroup } from "./event-groups.interaface";
import { EventService } from "../../event/event.service";
import { IActionState } from "../../client/client.interface";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

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
  ) {}

  ngOnInit() {
    this.buildEventGroupForm();
  }

  /**
   * Event group form
   *
   * @type {FormGroup}
   */
  public eventGroupForm: FormGroup;


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
    });

    return this;
  }

  public addEventGroup(group) {

  }
}
