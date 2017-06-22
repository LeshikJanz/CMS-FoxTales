import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ITag } from '../tag.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExperienceBuilderService } from '../experience-builder.service';
import { BsDropdownModule } from 'ngx-bootstrap';
import { DateTimePickerModule } from 'ng-pick-datetime';
import * as moment from 'moment';
import { Location } from '@angular/common';

@Component({
  selector: 'basic-details-run-times',
  templateUrl: './basic-details-run-times.component.html',
  styleUrls: ['basic-details-run-times.component.scss']
})

export class BasicDetailsRunTimesComponent implements OnChanges {
  public startMomentTime: string;
  public startMomentDate: string;
  public endMomentTime: string;
  public endMomentDate: string;
  public defaultTags: any[];
  @Input() public runTime: any;
  @Output() public updateRunTime: EventEmitter<any> = new EventEmitter();
  public hello: any;

  public sub: any;
  public id: any;

  constructor(private router: Router,
              private _location: Location,
              private route: ActivatedRoute) {
    this.hello = {};
  }

  public setMoment(event) {
    this.startMomentDate = event;
    this.updateRunTime.emit({ startDate: event });
    console.log(event);
  }

  public ngOnChanges() {
    console.log(this.runTime);
    this.updateRunTime.emit({
      startDate: this.startMomentDate,
      startTime: this.startMomentTime,
      endDate: this.endMomentDate,
      endTime: this.endMomentTime
    });
  }

}
