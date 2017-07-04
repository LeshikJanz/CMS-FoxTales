import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../../../hardware/device.service';
import { Device } from '../../../hardware/device';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'device-details-header',
  templateUrl: 'device-details-header.component.html',
  styleUrls: ['device-details-header.component.scss',
    '../../../shared/styles/animations.scss']
})

export class DeviceDetailsHeaderComponent implements OnInit {
  public device: Device;
  public filter: any = {
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
  private id: any;

  constructor(private deviceService: DeviceService,
              private toastrService: ToastrService,
              private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.route.children[0].params.subscribe((params: any) => {
      this.filter.id = this.id = params['id'];
      this.getDevice();
    });
  }

  public onRenameClicked(event: any): void {
    this.deviceService.renameDevice(this.id, event.name).subscribe((data: any) => {
      this.device.name = data.name;
    });
  }

  public getDevice(): void {
    this.deviceService
      .getDeviceDetails(this.filter)
      .subscribe((details: any) => {
        this.device = details.result.deviceDetails;
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
