import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EventService } from '../event.service';


@Component({
  selector: 'recap-report',
  templateUrl: './event-recap-report.component.html',
  styleUrls: ['./event-recap-report.component.scss']
})
export class EventRecapReportComponent implements OnInit {
public options: Object;
 
  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {EventService} event - Event service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private event: EventService,
    private route: ActivatedRoute
  ) {

        this.options = {
            title : { text : 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2],
            }]
        };
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    
  }



}
