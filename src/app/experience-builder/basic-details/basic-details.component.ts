import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITag } from '../tag.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExperienceBuilderService } from '../experience-builder.service';


@Component({
  selector: 'basic-details',
  templateUrl: './basic-details.component.html'
})

export class BasicDetailsComponent implements OnInit {
   public mytime: Date = new Date();
   public dt: Date = new Date();
 public minDate: Date = void 0;

  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {
                  (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
              }


   public ngOnInit(){
    console.log(this.experienceBuilderService.experience) 
   }


  Next(){
      console.log("dt", this.dt,"mytime",this.mytime)
  }

    public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }
}
