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

 @ViewChild('staticTabs') public staticTabs: TabsetComponent;

  constructor(private router: Router,
              private cpService: ColorPickerService,
              private experienceBuilderService: ExperienceBuilderService) {}

  public Next() {
      this.staticTabs.tabs[1].active = true;
  };

  public finish() {
    this.experienceBuilderService.postUIBuilderSettings({config: JSON.stringify({
      primaryColor: this.primaryColor,
      secondaryColor: this.secondaryColor,
      backgroundColor: this.backgroundColor,
      engagementText: this.text,
      engagementOptInText: this.optInText,
      engagementThankYouText: this.thankYouText
    })})
    .subscribe((configs) => {
      console.log(configs);
      this.router.navigate(['/experience-builder/container/content-gallery']);
    });
  };

}
