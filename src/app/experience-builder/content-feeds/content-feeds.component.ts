import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceBuilderService } from '../experience-builder.service';
import { ColorPickerService, Rgba } from 'ngx-color-picker';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'content-feeds-component',
  templateUrl: './content-feeds.component.html',
  styleUrls: ['./content-feeds.component.scss']
})

export class ContentFeedsComponent {
  @ViewChild('staticTabs') public staticTabs: TabsetComponent;
  public experience: any;
  public feedName: any;
  public moderateFeed: boolean;
  public feedDisplaySeconds: any;
  public playFullVideos: boolean;
  public playAudio: boolean;
  public backgroundOptions: any;
  public backgroundOptionValue: any;
  public backgroundColor: any;
  public backgroundStyleOptions: any;
  public backgroundStyleOptionValue: any;
  public backgroundPosition: any;
  public contentOption: any = [];
  public backgroundBase64: string;

  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {
                this.experience = this.experienceBuilderService.experience;
                this.backgroundOptions = [
                  { id: 'Image', name: 'Image'},
                  { id: 'Color', name: 'Color'}
                ];

                this.backgroundStyleOptions = [
                  { id: 'Stretch', name: 'Stretch'},
                  { id: 'Tile', name: 'Tile' },
                  { id: 'Fixed Scroll', name: 'Fixed Scroll' }
                ];
              }

  public createTab1() {
    this.staticTabs.tabs[1].active = true;
  }

  public createTab2() {
    this.staticTabs.tabs[2].active = true;
  }

  public createTab3(modal) {

    this.experienceBuilderService.postContentFeedSettings({
      name: this.feedName,
      preModerationEnabled: this.moderateFeed,
      backgroundColor: this.backgroundColor,
      backgroundImage: this.backgroundBase64,
      cycleTime: this.feedDisplaySeconds,
      playFullVideo: this.playFullVideos,
      playAudio: this.playAudio,
      aspectRatio: this.backgroundStyleOptionValue,
      backgroundFit: this.backgroundPosition

    }).subscribe((response) => {
      console.log(response);
      modal.hide();
    });
  };

  public checkedContentOption(event) {
    if (event.isChecked === true && this.contentOption.includes(event.name.id)) {
      return;
    }
    if (event.isChecked === false && this.contentOption.includes(event.name.id)) {
      this.contentOption.splice(this.contentOption.indexOf(event.name.id), 1);
    }
    if (event.isChecked === true && !this.contentOption.includes(event.name.id)) {
      this.contentOption.push(event.name.id);
    }
  };

  /**
   * Receive img in base64
   *
   * @param {string} base64 - string
   * @returns {void}
   */
  public onImgUploaded(data) {
      this.backgroundBase64 = data.base64.replace(/data:image\/(png|jpg|jpeg|gif);base64,/, '');
  };
}
