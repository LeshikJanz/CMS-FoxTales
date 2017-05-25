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
    public facebook: boolean = false ;
    public twitter: boolean = false ;
    public tumblr: boolean = false ;
    public instagram: boolean = false ;
    public facebookTextCopy: string = null;
    public twitterTextCopy: string = null;
    public instagramTextCopy: string = null;
    public tumblrTextCopy: string = null;

  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {}


generateTextArea(social){
    switch(social){
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
            alert("please choose a valid option");
            break;
    }
}

Finish(){
    this.experienceBuilderService.postSocialShareSettings({
      "shareToTwitter": this.twitter,
      "shareToFacebook": this.facebook,
  		"shareToInstagram": this.instagram,
  		"shareToTumblr": this.tumblr,
  		"twitterCopy": this.twitterTextCopy,
  		"facebookCopy": this.facebookTextCopy,
  		"instagramCopy": this.instagramTextCopy,
  		"tumblrCopy": this.tumblrTextCopy
    }).subscribe((response) => {
			console.log(response)
		})
}

}
