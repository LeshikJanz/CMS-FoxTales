import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../event/event.service';
import { IEvent } from '../../../event/event.interface';

@Component({
  selector: 'edit-event-header',
  templateUrl: 'edit-event-header.component.html',
  styleUrls: ['edit-event-header.component.scss',
    '../../../shared/styles/animations.scss']
})

export class EditEventHeaderComponent implements OnInit {
  public event: IEvent;

  constructor(private route: ActivatedRoute,
              private eventService: EventService) {}

  public ngOnInit() {
    this.route.children[0].params.subscribe((params: any) =>
      this.eventService.getEvent(params['id'])
        .subscribe((event: IEvent) => this.event = event)
    );
  }
}
