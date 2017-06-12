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
  public defaultTags: any[];
    public tags: ITag[];

  constructor(private router: Router,
              private experienceBuilderService: ExperienceBuilderService) {}

   public ngOnInit() {
        this.getTags();
    console.log(this.experienceBuilderService.experience);
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
        config: "{}",
        brands:this.defaultTags,
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

}
