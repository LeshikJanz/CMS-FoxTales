import { Component } from '@angular/core';
import { NavigationService } from '../../../shared/core/navigation/navigation.service';

@Component({
  selector: 'events-navigation',
  templateUrl: 'events-navigation.component.html',
  styleUrls: ['../../../shared/styles/navigation.scss',
    'events-navigation.component.scss']
})

export class EventsNavigationComponent {
  constructor(private nav: NavigationService) {}
}
