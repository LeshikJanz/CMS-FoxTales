import { Component } from '@angular/core';
import { NavigationService } from '../../../shared/core/navigation/navigation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'events-navigation',
  templateUrl: 'events-navigation.component.html',
  styleUrls: ['../../../shared/styles/navigation.scss',
    'events-navigation.component.scss']
})

export class EventsNavigationComponent {
  public eventId: number;

  constructor(private nav: NavigationService,
              private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
        this.eventId = params['id'];
        console.log('this.eventId');
        console.log(this.eventId);
      }
    )
  }
}
