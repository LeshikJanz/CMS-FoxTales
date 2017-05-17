import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'experience-builder-intro',
  templateUrl: './experience-builder-intro.html'
})

export class ExperienceBuilderIntroComponent {
  constructor(private router: Router) {}
}
