import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { IDeviceInfo } from './device-info.interface';

/**
 * Device info component
 */
@Component({
  selector: 'device-info',
  templateUrl: 'device-info.component.html',
  styleUrls: ['device-info.component.scss']
})

export class DeviceInfoComponent {

  @Input() public deviceInfo: IDeviceInfo;
}
