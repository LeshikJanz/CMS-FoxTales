import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceBuilderService } from '../experience-builder.service';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'content-gallery-component',
  templateUrl: './content-gallery.component.html'
})

export class ContentGalleryComponent {
  public options:any;

  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {
                this.options = ["Tiled","Stretch","Fixed Scroll"]
              }




}
