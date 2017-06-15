import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICol, ITableAction } from '../../shared/table';
import { IDevice } from '../device.interface';
import { Device } from '../device';
import { DeviceService } from '../device.service';

/**
 * Device list component
 */
@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: [ './device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  /**
   * Devices
   *
   * @type {Device[]}
   */
  public devices: IDevice[];

  /**
   * Total devices
   *
   * @type {number}
   */
  public totalDevices: number = 0;

  /**
   * Table columns
   *
   * @type {ICol[]}
   */
  public cols: ICol[] = [
    { id: 'name',      title: 'Name',  format: 'default',  searchable: true }
  ];

  /**
   * Row actions
   *
   * @type {ITableAction[]}
   */
  public actions: ITableAction[] = [
    { title: 'Edit',      callback: 'editDevice' },
    { title: 'Assign',   callback: 'editDevice' }
  ];

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {DeviceService} deviceService - Device service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private deviceService: DeviceService
  ) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.getDevices();
  }

  /**
   * Get devices
   *
   * @returns {void}
   */
  public getDevices(): void {
    this.deviceService
      .getDevices()
      .subscribe((devices: IDevice[]) => {
        this.devices = devices;
        this.totalDevices = devices.length;
      });
  }

  /**
   * Redirect to device edit page
   *
   * @param {string} id - Device id
   * @returns {Promise<boolean>}
   */
  public editDevice(id: string): Promise<boolean> {
    return this.router.navigate(['/admin/device', id]);
  }
}
