import { Component, Input } from '@angular/core';
import { IEvent } from '../../../event/event.interface';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../event/event.service';

@Component({
  selector: 'experience-header',
  templateUrl: 'experience-header.component.html',
  styleUrls: ['experience-header.component.scss',
    '../../../shared/styles/animations.scss']
})

export class ExperienceHeaderComponent {
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
