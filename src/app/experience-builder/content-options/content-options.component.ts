import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { ExperienceBuilderService } from '../experience-builder.service';

@Component({
  selector: 'content-options-component',
  templateUrl: './content-options.component.html'
})

export class ContentOptionsComponent {
 @ViewChild('staticTabs') staticTabs: TabsetComponent;
 public contentName: string;
 public contentTypeValue: string;
 public orientationTypeValue: string;

  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {}

             Next(){
            
                 this.experienceBuilderService.addContentOption({
    "experienceId":  this.experienceBuilderService.experience.experienceId,
    "name": this.contentName,
    "captureTypeId": this.contentTypeValue,
    "cameraSettings": [
      {
        "settingValueId": this.orientationTypeValue,
        "ConfigurationOptionId": 53
      }
    ]
  })
                 
                //   this.staticTabs.tabs[1].active = true;
             }

             Finish(){
                 console.log('finish behavior');
             }

}
