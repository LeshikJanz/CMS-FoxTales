import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'experience-builder',
  templateUrl: './experience-builder-container.html'
})

export class ExperienceBuilderContainerComponent {
  constructor(private router: Router) {}
}
