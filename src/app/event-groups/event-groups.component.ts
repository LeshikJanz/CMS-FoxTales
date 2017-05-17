import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from "../event/event.interface";
import { EventGroupsService } from "./event-groups.service";
import { IEventGroup } from "./event-groups.interaface";
import { EventService } from "../event/event.service";

@Component({
  selector: 'event-groups',
  templateUrl: './event-groups.component.html'
})

export class EventGroupsComponent implements OnInit {
  constructor(private router: Router,
              private eventGroupsService: EventGroupsService,
              private eventService: EventService) {
  }

  public eventGroups: IEventGroup[];
  public events: IEvent[];

  public ngOnInit(): void {
    this.getEventGroups();
  }

  public getEventGroups() {
    this.eventGroupsService
      .getEventGroups()
      .subscribe((eventGroups: IEventGroup[]) => {
        this.eventService
          .getEvents()
          .subscribe((events) => {
            this.eventGroups = eventGroups;
              this.eventGroups.forEach(group =>(group as any).events = events.filter(e => e.eventGroupId == group.id))
            //TODO: Change it when good eventGroups api will be available
          });
      });
  }
}
