import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'experience-page',
  templateUrl: 'experience.component.html'
})

export class ExperienceComponent {
  constructor(private router: Router) {}
}
