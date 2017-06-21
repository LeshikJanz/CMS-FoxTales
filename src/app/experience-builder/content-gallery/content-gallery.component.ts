import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceBuilderService } from '../experience-builder.service';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'content-gallery-component',
  templateUrl: './content-gallery.component.html'
})

export class ContentGalleryComponent {
  @ViewChild('staticTabs') public staticTabs: TabsetComponent;
  public options: any;
  public galleryName: string;
  public staticModal: any;
  public experience: any;
  public gallerySwitchOptions: any;
  public hashtags: any[];
  public customUrlChecked: boolean = false;
  public customUrl: any;
  public galleryDownloadChecked: boolean = false;
  public mobileBackgroundChecked: boolean = false;
  public onItemAdded: any;

  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {
              this.experience = this.experienceBuilderService.experience;
              this.options = [
                {id: 1, name: 'Tiled' },
                {id: 2, name: 'Stretch'},
                {id: 3, name: 'Fixed Scroll'}
                ];

              this.gallerySwitchOptions = [
                {id: 4, name: 'Public'},
                {id: 5, name: 'Private'}
              ];
              }

  public createTab1() {
    this.staticTabs.tabs[1].active = true;
    console.log('create tab1 function');
  };

  public createTab2() {
    console.log('create tab2 function ');
    this.staticTabs.tabs[2].active = true;
  };

  public createTab3() {
    console.log('finish tab');
    this.experienceBuilderService.postContentGallerySettings({
      name: this.galleryName,
      hashtags: this.hashtags.toString(),
      shortUrl: this.customUrl,
      showMobileBackgroundImage: this.mobileBackgroundChecked
    });

  }

  public checkedContentOption(event) {
    console.log(event);
  }

}
