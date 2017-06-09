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

  constructor(private router: Router) {}

 public Next() {
  console.log('next function');
 };

 public Finish() {
  console.log('finish function');
 };
}
