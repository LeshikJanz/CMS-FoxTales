import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import { ExperienceBuilderService } from '../experience-builder.service';

@Component({
  selector: 'content-options-component',
  templateUrl: './content-options.component.html',
     styleUrls: ['content-options.component.scss']
})

export class ContentOptionsComponent {
 @ViewChild('staticTabs') public staticTabs: TabsetComponent;
 public staticModal: any;
 public contentName: string;
 public contentTypeValue: string;
 public orientationTypeValue: string;

  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {}

 public Next() {
  this.experienceBuilderService.addContentOption({
    experienceId:  this.experienceBuilderService.experience.experienceId,
    name: this.contentName,
    captureTypeId: this.contentTypeValue,
    cameraSettings: [
      {
        settingValueId: this.orientationTypeValue,
        ConfigurationOptionId: 53
      }
      ]
    }).subscribe((response) => {
      console.log(response);
    });

  this.staticTabs.tabs[1].active = true;
  }

  public Finish() {
    console.log('finish behavior ');
  }

}
