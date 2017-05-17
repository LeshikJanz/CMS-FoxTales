import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../event.service';
import { IActionState } from "../../client/client.interface";


/**
 * Event list component
 */
@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  /**
   * Event
   *
   * @type {Event[]}
   */
  public Events: any[];

  /**
   *  Event actions
   *
   * @type {IActionState[]}
   */
  public eventActions: IActionState[] = [
    {id: 1, action: 'SETTINGS'},
    {id: 2, action: 'CLONE'},
    {id: 3, action: 'ARCHIEVE'},
    {id: 4, action: 'ADD TO GROUP'},
    {id: 5, action: 'ASSIGN USERS'},
  ];

  constructor(private eventService: EventService) {
  }

  public ngOnInit(): void {
    this.getEvents();
  }

  /**
   * Get events
   *
   * @returns {void}
   */
  public getEvents(): void {
    this.eventService
      .getEvents()
      .subscribe((event) => {
        this.Events = event;
      });
  }


}
