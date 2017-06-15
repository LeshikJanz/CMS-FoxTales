import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import { ExperienceBuilderService } from '../experience-builder.service';
import { ISwitcher } from "../../components/toggles/switcher/switcher.interface";

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
 public contentSwitchOptions: ISwitcher[] = [
   { id: 1, name: 'Still' },
   { id: 2, name: 'GIF' },
   { id: 4, name: 'GIF' }
 ]

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
