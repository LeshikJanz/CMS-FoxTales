import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceBuilderService } from '../experience-builder.service';

@Component({
  selector: 'content-gallery-component',
  templateUrl: './content-gallery.component.html'
})

export class ContentGalleryComponent {


  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {}




}
