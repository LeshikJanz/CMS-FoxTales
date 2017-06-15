import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'experience-navigation',
  templateUrl: 'experience-navigation.component.html',
  styleUrls: ['experience-navigation.component.scss']
})

export class ExperienceNavigationComponent {
  public curLocation: string;

  public experienceId: string;

  constructor(private location: Location,
              private router: Router) {
    this.router.events.subscribe((val) => {
      this.curLocation = this.location.path();
      this.experienceId = this.curLocation.split('/')[2];
    });
  }
}
