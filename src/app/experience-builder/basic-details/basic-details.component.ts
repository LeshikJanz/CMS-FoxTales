import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITag } from '../tag.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExperienceBuilderService } from '../experience-builder.service';
import { BsDropdownModule } from 'ngx-bootstrap';
import { DateTimePickerModule } from 'ng-pick-datetime';
import * as moment from 'moment';


@Component({
  selector: 'basic-details',
  templateUrl: './basic-details.component.html'
})

export class BasicDetailsComponent implements OnInit {
  public startMomentTime: string;
  public startMomentDate: string;
  public endMomentTime: string;
  public endMomentDate: string;



  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {

              }


   public ngOnInit(){
    console.log(this.experienceBuilderService.experience) 
   }


  Next(){
    this.experienceBuilderService.addRunTimesExperience(
      [{
        "startTime": moment(this.startMomentDate + this.startMomentTime, "MMM DD, YYYYHH:mm").format(),
        "endTime": moment(this.endMomentDate + this.endMomentTime, "MMM DD, YYYYHH:mm").format()
      }]
    ).subscribe((runTimes) => {
      console.log(runTimes)
      this.router.navigate(['/experience-builder/container/content-options']);
    })
  }


}
