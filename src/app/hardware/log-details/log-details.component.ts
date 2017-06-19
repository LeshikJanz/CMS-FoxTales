import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITableAction } from '../../shared/table/action.interface';
import { ICol } from '../../shared/table/col.interface';
import { DeviceService } from '../device.service';
import { sortTypes } from '../list/sort-type.enum';
import { ILog } from '../log.interface';

/**
 * Device details component
 */
@Component({
  selector: 'log-details',
  templateUrl: './log-details.component.html',
  styleUrls: ['log-details.component.scss']
})
export class LogDetailsComponent implements OnInit {
  /**
   * Log
   *
   * @type {Log}
   */
  public log: ILog;

  /**
   * number
   *
   * @type {number}
   */
  private id: number;

  /**
   * Constructor
   *
   * @param {ActivatedRoute} route - ActivatedRoute
   * @param {DeviceService} deviceService - Device service
   * @returns {void}
   */
  constructor(private deviceService: DeviceService,
              private route: ActivatedRoute) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const id = params['id'];
      this.getLog(id);
    });
  }

  /**
   * Get logs
   *
   * @returns {void}
   */
  public getLog(id: string): void {
    this.deviceService
      .getLog(id)
      .subscribe((log: ILog) => {
        this.log = log;
      });
  }
}
