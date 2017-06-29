import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColorPickerService, Rgba } from 'ngx-color-picker';
import { TabsetComponent } from 'ngx-bootstrap';
import { ExperienceBuilderService } from '../experience-builder.service';

@Component({
  selector: 'ui-builder-component',
  templateUrl: './ui-builder.component.html',
  styleUrls: ['./ui-builder.component.scss']
})

export class UIBuilderComponent {
  public primaryColor: string;
  public secondaryColor: string;
  public backgroundColor: string;
  public text: string;
  public optInText: string;
  public thankYouText: string;
  public logoBase64: string;
  public overlayBase64: string;

 @ViewChild('staticTabs') public staticTabs: TabsetComponent;

  constructor(private router: Router,
              private cpService: ColorPickerService,
              private experienceBuilderService: ExperienceBuilderService) {}

  public Next() {
      this.staticTabs.tabs[1].active = true;
  };

  public finish() {
    this.experienceBuilderService.postUIBuilderStoryRingSettings({
      primaryColor: this.primaryColor,
      secondaryColor: this.secondaryColor,
      ledColor: this.backgroundColor,
      engageText: this.text,
      optInText: this.optInText,
      thankYouText: this.thankYouText,
      overlayData: this.overlayBase64,
      logoData: this.logoBase64
    })
    .subscribe((configs) => {
      console.log(configs);
      this.router.navigate(['/experience-builder/container/content-gallery']);
    });
  };

  /**
   * Receive img in base64
   *
   * @param {string} base64 - string
   * @returns {void}
   */
  public onImgUploaded(data,type) {
    if(type === 'logo') {
      this.logoBase64 = data.base64;
      this.logoBase64 = this.logoBase64.replace(/data:image\/(png|jpg|jpeg|gif);base64,/, '');
    }
    if(type === 'overlay') {
      this.overlayBase64 = data.base64;
      this.overlayBase64 = this.overlayBase64.replace(/data:image\/(png|jpg|jpeg|gif);base64,/, '');
    }

  }

}
