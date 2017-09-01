import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperienceBuilderService } from '../experience-builder.service';

@Component({
  selector: 'experience-builder',
  templateUrl: './experience-builder-container.html'
})

export class ExperienceBuilderContainerComponent implements OnInit {

  /**
   * this is for edit/create from experience list
   * will look for query params to populate information
   */
  public id: number;
  public sub: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private experienceBuilderService: ExperienceBuilderService) {}

  public ngOnInit() {
    this.sub = this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.id = +params['id'];
        this.experienceBuilderService.experience.experienceId = params['id'];
      }
    });
  }
}
