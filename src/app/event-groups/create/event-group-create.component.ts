import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from "../../event/event.interface";
import { EventGroupsService } from "./event-groups.service";
import { IEventGroup } from "./event-groups.interaface";
import { EventService } from "../../event/event.service";
import { IActionState } from "../../client/client.interface";

@Component({
  selector: 'event-group-create',
  templateUrl: 'event-group-create.component.html',
  styleUrls: ['event-group-create.component.scss']
})

export class EventGroupCreateComponent {

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @returns {void}
   */
  constructor(private router: Router) {
  }
}
