import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EventService } from '../event.service';

@Component({
  selector: 'recap-report',
  templateUrl: './event-recap-report.component.html',
  styleUrls: ['./event-recap-report.component.scss']
})
export class EventRecapReportComponent implements OnInit {
  /**
   * getting query parameter to find specific experiences
   *
   */
  public id: number;
  public currentEvent: any;
  private sub: any;
  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {EventService} event - Event service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.eventService.getEvent(this.id)
    .subscribe((response) => {
      console.log(response);
      this.currentEvent = response;
    });
  }
}
