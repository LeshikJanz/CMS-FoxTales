import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ExperienceBuilderService } from '../experience-builder.service';

@Component({
  selector: 'experience-builder-intro',
  templateUrl: './experience-builder-intro.html'
})

export class ExperienceBuilderIntroComponent implements OnInit {
  public experienceName: string;
  public selectedValue: string;

   /**
    * getting query parameter to create experience
    *
    */
   public id: number;
    public sub: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private experienceBuilderService: ExperienceBuilderService) {

              }

   public ngOnInit(){
      this.sub = this.route.queryParams.subscribe(params =>{
        this.id = +params['id'];
      })


   }
 

  Next(){
    this.experienceBuilderService.addExperience().subscribe((experience) => {
     console.log(experience)
   })
    

  }
}
