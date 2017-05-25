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
    public facebookTextCopy: string;
    public twitterTextCopy: string;
    public instagramTextCopy: string;
    public tumblrTextCopy: string;

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
    console.log(this.facebookTextCopy, this.instagramTextCopy, this.tumblrTextCopy, this.twitterTextCopy)
}

}
