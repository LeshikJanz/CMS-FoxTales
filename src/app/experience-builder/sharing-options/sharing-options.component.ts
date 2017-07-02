import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceBuilderService } from '../experience-builder.service';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'sharing-options-component',
  templateUrl: './sharing-options.component.html',
  styleUrls: ['sharing-options.component.scss']
})

export class SharingOptionsComponent {
 @ViewChild('staticTabs') public staticTabs: TabsetComponent;
 public staticModal: any;
 public facebook: boolean = false ;
 public twitter: boolean = false ;
 public tumblr: boolean = false ;
 public instagram: boolean = false ;
 public facebookTextCopy: string = null;
 public twitterTextCopy: string = null;
 public instagramTextCopy: string = null;
 public tumblrTextCopy: string = null;
 public sharingOptionName: string = null;
 public experience: any;
 public contentOption: any = [];

  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {
              this.experience = this.experienceBuilderService.experience;
              }

 public generateTextArea(social) {
  switch (social) {
   case 1:
    this.facebook = !this.facebook;
    break;
   case 2:
    this.twitter = !this.twitter;
    break;
   case 3:
    this.instagram = !this.instagram;
    break;
   case 4:
    this.tumblr = !this.tumblr;
    break;
   default:
    alert('please choose a valid option');
    break;
 };
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

 public finish() {
  this.experienceBuilderService.postSocialShareSettings({
  name: this.sharingOptionName,
  shareToTwitter: this.twitter,
  shareToFacebook: this.facebook,
  shareToInstagram: this.instagram,
  shareToTumblr: this.tumblr,
  twitterCopy: this.twitterTextCopy,
  facebookCopy: this.facebookTextCopy,
  instagramCopy: this.instagramTextCopy,
  tumblrCopy: this.tumblrTextCopy,
  contentOptionIds: this.contentOption
  }).subscribe((response) => {
   console.log(response);
   this.router.navigate(['/experience-builder/container/email-builder']);
  });
 };

 public Next() {
  this.staticTabs.tabs[1].active = true;
 };

}
