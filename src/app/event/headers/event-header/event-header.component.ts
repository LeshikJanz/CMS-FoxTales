import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../event.service';
import { IEvent } from '../../event.interface';

@Component({
  selector: 'event-header',
  templateUrl: 'event-header.component.html',
  styleUrls: ['event-header.component.scss',
    '../../../shared/styles/animations.scss']
})

export class EventHeaderComponent {
  constructor(private route: ActivatedRoute,
              private eventService: EventService) {
  }

  public id: number;

  public event: IEvent;

  public ngOnInit() {

    this.route.parent.params.subscribe((params: any) => {
      this.id = +params['id'];
      this.eventService.getEvent(this.id)
        .subscribe((event: IEvent) =>
          this.event = event
        )
    });
  }
}
