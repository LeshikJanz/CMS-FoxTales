import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICol, ITableAction } from '../../shared/table';
import { Device } from '../device';
import { IDevice, IDeviceFilter, IDeviceList } from '../device.interface';
import { DeviceService } from '../device.service';
import { sortTypes } from './sort-type.enum';

/**
 * Device list component
 */
@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
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
    {id: 'name', title: 'Name', format: 'default', searchable: true},
    {id: 'type', title: 'Type', format: 'default', searchable: false},
    {id: 'health', title: 'Health', format: 'boolean', searchable: false},
    {id: 'cpu', title: 'CPU', format: 'default', searchable: false},
    {id: 'memory', title: 'Memory', format: 'default', searchable: false},
    {id: 'temperature', title: 'Temperature', format: 'temperature', searchable: false},
    {id: 'errors', title: 'App errors', format: 'boolean', searchable: false},
    {id: 'virusCheck', title: 'System errors', format: 'boolean', searchable: false},
    {id: 'internetStatus', title: 'Internet status', format: 'internetStatus', searchable: false}
  ];

  /**
   * Row actions
   *
   * @type {ITableAction[]}
   */
  public actions: ITableAction[] = [
    {title: 'Edit', callback: 'editDevice'},
    {title: 'Assign', callback: 'editDevice'}
  ];

  /**
   * Filter
   *
   * @type {IUserFilter}
   */
  public filter: IDeviceFilter = {
    pageingInfo: {
      currentPage: 0,
      pageRowCount: 10
    },
    currentSortType: 0,
    isAscendantSort: true,
    searchFields: {
      name: ''
    }
  };

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {DeviceService} deviceService - Device service
   * @returns {void}
   */
  constructor(private router: Router,
              private deviceService: DeviceService) {
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
      .getDevices(this.filter)
      .subscribe((devices: IDeviceList) => {
        this.devices = devices.result;
        this.totalDevices = devices.totalRowCount;
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

  /**
   * On sort changed
   *
   * @param {ICol} col - Table column
   * @returns {void}
   */
  public onSortChanged(col: ICol): void {
    this.filter.isAscendantSort = col.sort;
    this.filter.currentSortType = sortTypes[col.id];

    this.getDevices();
  }

  /**
   * On limit changed
   *
   * @param {number} limit - Rows limit
   * @returns {void}
   */
  public onLimitChanged(limit: number): void {
    this.filter.pageingInfo.currentPage = 0;
    this.filter.pageingInfo.pageRowCount = limit;

    this.getDevices();
  }

  /**
   * On search changed
   *
   * @param {any} query - Search query
   * @returns {void}
   */
  public onSearchChanged(query: any): void {
    this.filter.searchFields = query;
    this.getDevices();
  }

  /**
   * On page changed
   *
   * @param {number} page - Page number
   * @returns {void}
   */
  public onPageChanged(page: number): void {
    this.filter.pageingInfo.currentPage = page - 1;
    this.getDevices();
  }

  /**
   * On type changed
   *
   * @param {number} type - User type
   * @returns {void}
   */
  public onTypeChanged(type: number): void {
    this.filter.currentSortType = type;
    this.getDevices();
  }

  /**
   * On action changed
   *
   * @param {any} action - Action
   * @returns {void}
   */
  public onActionChanged(action: any): void {
    if (this[action.callback]) {
      this[action.callback](action.id);
    }
  }
}
