import { Component, OnInit } from '@angular/core';
import {SelectButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';

@Component({
  selector: 'app-experience-builder',
  templateUrl: './experience-builder.component.html',
  styleUrls: ['./experience-builder.component.css']
})
export class ExperienceBuilderComponent implements OnInit {

  public experienceType: any[];
  public selectedExperience: string;
  public experienceName: string;

  constructor() {
    this.experienceType = [];
    this.experienceType.push({label: 'StoryStudio', value: 'StoryStudio'});
    this.experienceType.push({label: 'StoryRing', value: 'StoryRing'});
    this.experienceType.push({label: 'Content Feed', value: 'Content Feed'});
    this.experienceType.push({label: 'Future Products', value: 'Future Products'});
   }

  ngOnInit() {
  }

}
