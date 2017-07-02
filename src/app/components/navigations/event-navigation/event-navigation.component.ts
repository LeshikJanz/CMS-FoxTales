import { Component } from '@angular/core';
import { NavigationService } from '../../../shared/core/navigation/navigation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'event-navigation',
  templateUrl: 'event-navigation.component.html',
  styleUrls: ['event-navigation.component.scss']
})

export class EventNavigationComponent {
  public curLocation: string;
  public eventId: string;

  constructor(private nav: NavigationService,
              private route: ActivatedRoute) {

    this.route.firstChild.params.subscribe((params) =>
      this.eventId = params['id']
    )
  }

}
