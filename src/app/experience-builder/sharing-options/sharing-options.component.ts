import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceBuilderService } from '../experience-builder.service';

@Component({
  selector: 'sharing-options-component',
  templateUrl: './sharing-options.component.html'
})

export class SharingOptionsComponent {


  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {}




}
