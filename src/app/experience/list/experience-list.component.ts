import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ExperienceService } from '../experience.service';
import { ActivatedRoute } from '@angular/router';

/**
 * Experience list component
 */
@Component({
  selector: 'experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.scss']
})
export class ExperienceListComponent implements OnInit {


    /**
    * Experience
    *
    * @type {Experience[]}
    */
    public Experience: any[];
    /**
    * getting query parameter to find specific experiences
    *
    */
    id: number;
    private sub: any;

    constructor(private experienceService: ExperienceService,
                private route: ActivatedRoute){
    }

    public ngOnInit(): void {
        this.sub = this.route.params.subscribe(params =>{
          this.id = +params['id'];
      })
        this.getExperiences();
    }

    /**
    * Get experiences
    *
    * @returns {void}
    */
    public getExperiences(): void {
        this.experienceService
        .getExperiences(this.id)
        .subscribe((experiences) => {
          this.Experience = experiences;
    });
  }

}
