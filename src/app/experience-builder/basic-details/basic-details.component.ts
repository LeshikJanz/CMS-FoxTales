import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITag } from '../tag.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExperienceBuilderService } from '../experience-builder.service';
import { BsDropdownModule } from 'ngx-bootstrap';
import { DateTimePickerModule } from 'ng-pick-datetime';


@Component({
  selector: 'basic-details',
  templateUrl: './basic-details.component.html'
})

export class BasicDetailsComponent implements OnInit {
  public momentTime: string;
  public momentDate: string;



  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {
     
              }


   public ngOnInit(){
    console.log(this.experienceBuilderService.experience) 
   }


  Next(){

  }


}
