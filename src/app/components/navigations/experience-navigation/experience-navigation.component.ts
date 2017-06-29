import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../shared/core/navigation/navigation.service';

@Component({
  selector: 'experience-navigation',
  templateUrl: 'experience-navigation.component.html',
  styleUrls: ['../../../shared/styles/navigation.scss',
    'experience-navigation.component.scss'
  ]
})

export class ExperienceNavigationComponent {
  public experienceId: string;

  constructor(private route: ActivatedRoute,
              private nav: NavigationService) {
    this.route.firstChild.params.subscribe((params) =>
      this.experienceId = params['id']
    )
  }
}
