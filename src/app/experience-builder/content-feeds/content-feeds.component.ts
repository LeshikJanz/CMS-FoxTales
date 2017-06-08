import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceBuilderService } from '../experience-builder.service';

@Component({
  selector: 'content-feeds-component',
  templateUrl: './content-feeds.component.html'
})

export class ContentFeedsComponent {

  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {}

}
