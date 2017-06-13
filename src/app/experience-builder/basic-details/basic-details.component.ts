import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  public defaultTags: any[];
    public tags: ITag[];
  public sub: any;
  public id: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private experienceBuilderService: ExperienceBuilderService) {}

  public ngOnInit() {
    // if(this.route.queryParams.value.experience !== undefined) {
    //   this.sub = this.route.queryParams.subscribe((params) => {
    //     this.id = +params['experience'];
    //   });
    //   this.getExperience();
    //  }
    this.getTags();
  }

  public Next() {
    this.defaultTags = this.defaultTags.map((tag: ITag) => {
      if (tag.name) {
        return tag.name;
      } else {
        return tag;
      }
    });
    this.experienceBuilderService.addBasicDetailsExperience(
      {
        name: this.experienceBuilderService.experience.displayName,
        eventId: this.experienceBuilderService.experience.eventId,
        productId: this.experienceBuilderService.experience.productId,
        config: '{}',
        brands: this.defaultTags,
        runTimes:
        [{
          startTime: moment(this.startMomentDate +
            this.startMomentTime, 'MMM DD, YYYYHH:mm').format(),
          endTime: moment(this.endMomentDate + this.endMomentTime, 'MMM DD, YYYYHH:mm').format()
        }]
      }).subscribe((runTimes) => {
      this.router.navigate(['/experience-builder/container/content-options']);
    });
  };

  public getTags(): void {
    this.experienceBuilderService
      .getTags()
      .subscribe((tags: ITag[]) => this.tags = tags);
  }

  /**
   * Tag transformer
   *
   * @param {string} tag - Tag
   * @returns {string} - Transformed tag
   */
  public tagTransformer(tag: string): string {
    return tag.replace(/\s/g, '');
  }

  /**
   * Search tags
   *
   * @param {string} value - Value
   * @param {any} target - Tag
   * @returns {boolean}
   */
  public matchingFn(value: string, target: any): boolean {
    if (!target['name']) {
      return false;
    }

    const targetValue = target['name'].toString();
    return targetValue && targetValue
      .toLowerCase()
      .indexOf(value.toLowerCase()) >= 0;
  }

  public getExperience() {
    this.experienceBuilderService
    .getExperience(this.id)
    .subscribe((experience) => {
      this.experienceBuilderService.experience.experienceId = this.id;
      this.experienceBuilderService.experience.displayName = experience.name,
      this.experienceBuilderService.experience.eventId = experience.eventId,
      this.experienceBuilderService.experience.productId = experience.productId,
      this.startMomentDate = moment(experience.runTimes[0].startTime).format('MMM DD, YYYY');
      this.endMomentDate = moment(experience.runTimes[0].endTime).format('MMM DD, YYYY');
      this.startMomentTime = moment(experience.runTimes[0].startTime).format('hh:mm');
      this.endMomentTime = moment(experience.runTimes[0].endTime).format('hh:mm');
      this.defaultTags = experience.brands.map((tag: ITag) => {
      if (tag.name) {
        return tag.name;
      } else {
        return tag;
      }
    });
    });
  }

}
