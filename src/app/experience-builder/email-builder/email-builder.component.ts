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

  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {}

 public Next() {
  this.experienceBuilderService.experience.emailBuilderName = this.emailBuilderName;
  this.experienceBuilderService.experience.fromEmailAddress = this.fromEmailAddress;
  this.experienceBuilderService.experience.senderName = this.senderName;
  this.experienceBuilderService.experience.emailSubject = this.emailSubject;
  this.experienceBuilderService.experience.emailPreviewText = this.emailPreviewText;
 };

 public Finish() {
  this.experienceBuilderService.experience.emailBodyText = this.emailBodyText;
  this.experienceBuilderService.experience.ctaText = this.ctaText;
  this.experienceBuilderService.postEmailSettings().subscribe((response) => {
    console.log(response);
  });
 };
}
