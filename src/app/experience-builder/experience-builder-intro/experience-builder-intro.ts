import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ExperienceBuilderService } from '../experience-builder.service';
import { ButtonsModule } from 'ngx-bootstrap';
import { ICheckbox } from '../../components/toggles/checkbox/checkbox.component';
import { ISwitcher } from '../../components/toggles/switcher/switcher.interface';

@Component({
  selector: 'experience-builder-intro',
  templateUrl: './experience-builder-intro.html',
  styleUrls: ['experience-builder-intro.scss']
})

export class ExperienceBuilderIntroComponent implements OnInit {
  public experienceName: string;
  public selectedValue: any;

  public switchOptions: ISwitcher[] = [{
    id: 1,
    name: 'StoryStudio'
  }, {
    id: 2,
    name: 'StoryRing'
  }];

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

  /**
   * Switcher handler
   *
   * @param event
   * @returns {void}
   */
  public onToggle(event: ISwitcher): void {
    console.log('You choise');
    console.log(event);
  }

  public ngOnInit() {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.id = +params['id'];
    });
  }

  public Next() {
console.log('this.selectedValue');
console.log(this.selectedValue);

    this.experienceBuilderService.addExperience({
      name: this.experienceName,
      eventId: this.id,
      productId: this.selectedValue
    }).subscribe((experience) => {
      this.experienceBuilderService.experience['experienceId'] = experience.id;
      this.experienceBuilderService.experience['eventId'] = experience.eventId;
      this.experienceBuilderService.experience['productId'] = experience.productId;
      this.experienceBuilderService.experience['displayName'] = experience.displayName;
      this.router.navigate(['/experience-builder/container/basic-details']);
    });
  }
}
