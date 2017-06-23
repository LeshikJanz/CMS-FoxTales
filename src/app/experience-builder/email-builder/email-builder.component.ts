import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { ExperienceBuilderService } from '../experience-builder.service';

@Component({
  selector: 'email-builder-component',
  templateUrl: './email-builder.component.html'
})

export class EmailBuilderComponent {
   @ViewChild('staticTabs') public staticTabs: TabsetComponent;
   public staticModal: any;

   public emailBuilderName: string;
   public fromEmailAddress: string;
   public senderName: string;
   public emailSubject: string;
   public emailPreviewText: string;
   public emailBodyText: string;
   public ctaText: string;
   public experience: any;
   public contentOption: any = [];

  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {
              this.experience = this.experienceBuilderService.experience;
              }

 public Next() {
  this.staticTabs.tabs[1].active = true;
 };

  public Next2() {
  this.staticTabs.tabs[2].active = true;
 };

 public Finish() {
  this.experienceBuilderService.postEmailSettings({
    name: this.emailBuilderName,
    senderName: this.senderName,
    senderAddress: this.fromEmailAddress,
    subject: this.emailSubject,
    previewText: this.emailPreviewText,
    callToActionText: this.ctaText,
    contentOptionIds: this.contentOption
  }).subscribe((response) => {
    console.log(response);
    this.router.navigate(['/experience-builder/container/ui-builder']);
  });
 };

  public checkedContentOption(event) {
    if(event.isChecked === true && this.contentOption.includes(event.name.id)){
    }
    if(event.isChecked === false && this.contentOption.includes(event.name.id)){
      this.contentOption.splice(this.contentOption.indexOf(event.name.id),1);
    }
    if(event.isChecked === true && !this.contentOption.includes(event.name.id)){
      this.contentOption.push(event.name.id)
    }
  };
}
