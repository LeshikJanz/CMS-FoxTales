import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITableAction } from '../../shared/table/action.interface';
import { ICol } from '../../shared/table/col.interface';
import { IDeviceClient } from '../device-client.interface';
import { IDeviceRole } from '../device-role.interface';
import { IDeviceDetails, IDeviceFilter, IDeviceList } from '../device.interface';
import { DeviceService } from '../device.service';
import { sortTypes } from '../list/sort-type.enum';
import { ILog } from '../log.interface';
import { ToastrService } from 'ngx-toastr';

/**
 * Device details component
 */
@Component({
  selector: 'device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['device-details.component.scss',
    '../../shared/styles/form-element.scss']
})
export class DeviceDetailsComponent implements OnInit {
  /**
   * Device
   *
   * @type {Device}
   */
  public device: IDeviceDetails;

  /**
   * Devices
   *
   * @type {ILog[]}
   */
  public logs: ILog[];

  /**
   * Total logs
   *
   * @type {number}
   */
  public totalLogs: number = 0;

  /**
   * Table columns
   *
   * @type {ICol[]}
   */
  public cols: ICol[] = [
    {id: 'logTime', title: 'Date', format: 'date', formatOptions: ['shortDate'], searchable: false, notSortable: true},
    {id: 'logTime', title: 'Time', format: 'date', formatOptions: ['shortTime'], searchable: false, notSortable: true},
    {id: 'type', title: 'Type', format: 'default', searchable: false, notSortable: true},
    {id: 'memory', title: 'Memory', format: 'default', searchable: false, notSortable: true},
    {id: 'temperature', title: 'Temperature', format: 'temperature', searchable: false, notSortable: true},
    {id: 'cpu', title: 'CPU', format: 'default', searchable: false, notSortable: true},
    {id: 'internetStatus', title: 'Internet', format: 'internetStatus', searchable: false, notSortable: true}
  ];

  /**
   * Row actions
   *
   * @type {ITableAction[]}
   */
  public actions: ITableAction[] = [
    {title: 'Details', callback: 'detailsLog'},
  ];

  /**
   * Filter
   *
   * @type {IDeviceFilter}
   */
  public filter: IDeviceFilter = {
    id: -1,
    pageingInfo: {
      currentPage: 0,
      pageRowCount: 10
    },
    currentSortType: 0,
    isAscendantSort: false,
    searchFields: {
      name: ''
    }
  };

  /**
   * number
   *
   * @type {number}
   */
  private id: number;

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {DeviceService} deviceService - Device service
   * @returns {void}
   */
  constructor(private router: Router,
              private deviceService: DeviceService,
              private toastrService: ToastrService,
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
      this.filter.id = this.id = params['id'];
      this.getLogs();
    });
  }

  /**
   * Get logs
   *
   * @returns {void}
   */
  public getLogs(): void {
    this.deviceService
      .getDeviceDetails(this.filter)
      .subscribe((details: IDeviceList) => {
        this.logs = details.result.deviceLogs.map((item) => {
          item.id = item.logId;
          return item;
        });
        this.device = details.result.deviceDetails;
        this.totalLogs = details.totalRowCount;
      });
  }

  /**
   * Redirect to device details page
   *
   * @returns {Promise<boolean>}
   */
  public detailsLog(id: string): Promise<boolean> {
    console.log(id);
    return this.router.navigate(['/admin/log', id,]);
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

    this.getLogs();
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

    this.getLogs();
  }

  /**
   * On search changed
   *
   * @param {any} query - Search query
   * @returns {void}
   */
  public onSearchChanged(query: any): void {
    this.filter.searchFields = query;
    this.getLogs();
  }

  /**
   * On page changed
   *
   * @param {number} page - Page number
   * @returns {void}
   */
  public onPageChanged(page: number): void {
    this.filter.pageingInfo.currentPage = page - 1;
    this.getLogs();
  }

  /**
   * On type changed
   *
   * @param {number} type - Device type
   * @returns {void}
   */
  public onTypeChanged(type: number): void {
    this.filter.currentSortType = type;
    this.getLogs();
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

  public onRenameClicked(event: any): void {
    this.deviceService.renameDevice(this.id, event.name).subscribe((data: any) => {
      this.device.name = data.name;
    });
  }

  public downloadFile() {
    this.deviceService.downloadDeviceSettings(this.id).subscribe((data) => {
      let a = document.createElement('a');
      let file = new Blob([JSON.stringify(data)], {type: 'application/json'});
      a.href = URL.createObjectURL(file);
      a.download = `settings.json`;
      a.click();
    });
  }

  public restart() {
    this.deviceService.restartDevice(this.id).subscribe(() => {
      this.toastrService.success('Device was restarted successfully');
    });
  }
}
