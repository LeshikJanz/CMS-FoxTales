import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceBuilderService } from '../experience-builder.service';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'content-gallery-component',
  templateUrl: './content-gallery.component.html',
  styleUrls: ['./content-gallery.component.scss']
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
  public galleryType: any;
  public backgroundFitType: any;
  public backgroundPosition: any;
  public contentOption: any = [];
  public backgroundBase64: string;
  public mobileBackgroundBase64: string;

  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {
              this.experience = this.experienceBuilderService.experience;
              this.options = [
                {id: 'Tiled', name: 'Tiled' },
                {id: 'Stretch', name: 'Stretch'},
                {id: 'Fixed Scroll', name: 'Fixed Scroll'}
                ];

              this.gallerySwitchOptions = [
                {id: true, name: 'Public'},
                {id: false, name: 'Private'}
              ];
              this.hashtags = [];
              }

  public createTab1() {
    this.staticTabs.tabs[1].active = true;
    console.log('create tab1 function');
  };

  public createTab2() {
    console.log('create tab2 function ');
    this.staticTabs.tabs[2].active = true;
  };

  public createTab3(modal) {
    console.log('finish tab');
    this.hashtags = this.hashtags.map((hashtag) =>{
      return hashtag.value;
    });
 
    this.experienceBuilderService.postContentGallerySettings({
      name: this.galleryName,
      hashtags: this.hashtags.toString(),
      backgroundFit: this.backgroundFitType,
      backgroundPosition: this.backgroundPosition,
      backgroundImage: this.backgroundBase64,
      shortUrl: this.customUrl,
      showMobileBackgroundImage: this.mobileBackgroundChecked,
      mobileBackgroundImage: this.mobileBackgroundBase64,
      navigationEnabled: this.galleryType,
      contentOptionsIds: this.contentOption
    }).subscribe((response) => {
      console.log(response);
      modal.hide();
      this.router.navigate(['/experience-builder/container/content-feeds']);
    });

  }

  public checkedContentOption(event) {
    if(event.isChecked === true && this.contentOption.includes(event.name.id)){
    }
    if(event.isChecked === false && this.contentOption.includes(event.name.id)){
      this.contentOption.splice(this.contentOption.indexOf(event.name.id),1);
    }
    if(event.isChecked === true && !this.contentOption.includes(event.name.id)){
      this.contentOption.push(event.name.id)
    }
  }

  /**
   * Receive img in base64
   *
   * @param {string} base64 - string
   * @returns {void}
   */
  public onImgUploaded(data,type) {
    if(type === 'background') {
      this.backgroundBase64 = data.base64.replace(/data:image\/(png|jpg|jpeg|gif);base64,/, '');
    }
    if(type === 'mobileBackground') {
      this.mobileBackgroundBase64 = data.base64.replace(/data:image\/(png|jpg|jpeg|gif);base64,/, '');
    }

  }

}
