import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import { ExperienceBuilderService } from '../experience-builder.service';
import { ModalDirective } from 'ngx-bootstrap';
import { ISwitcher } from '../../components/toggles/switcher/switcher.interface';

@Component({
  selector: 'content-options-component',
  templateUrl: './content-options.component.html',
     styleUrls: ['content-options.component.scss']
})

export class ContentOptionsComponent {
 @ViewChild('staticTabs') public staticTabs: TabsetComponent;
 public contentOptionModal: any;
 public contentName: string;
 public contentTypeValue: string;
 public orientationTypeValue: string;
 public contentSwitchOptions: ISwitcher[] = [
   { id: 1, name: 'Still' },
   { id: 2, name: 'GIF' },
   { id: 4, name: 'BurstGIF' }
 ];
  public orientationSwitchOptions: ISwitcher[] = [
   { id: 106, name: 'Landscape' },
   { id: 105, name: 'Portrait' },
   { id: 104, name: 'Square' }
 ];
 public contentOptions: any[];
 public contentTypeOption: any;
 public orientationTypeOption: any;
 public animatedOverlay: any;

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

  public Finish(modal) {
    console.log(this.animatedOverlay)
    this.experienceBuilderService
    .getContentOptions(this.experienceBuilderService.experience.experienceId)
    .subscribe((response) => {
      this.contentOptions = response.map((content) => {
        return content;
      });
      this.contentName = null;
      modal.hide();
      this.staticTabs.tabs[0].active = true;
    });
  }

  public contentOptionEdit(content) {
    console.log(content)
   this.contentName = content.name;
   if (content.captureTypeId === 1) {
    this.contentTypeOption = this.contentSwitchOptions[0].id;
   }
  if (content.captureTypeId === 2) {
    this.contentTypeOption = this.contentSwitchOptions[1].id;
   }
  if (content.captureTypeId === 4) {
    this.contentTypeOption = this.contentSwitchOptions[2].id;
   }
  //  this.orientationTypeValue = content.cameraSettings[0].settingValueId; 
  }

}
