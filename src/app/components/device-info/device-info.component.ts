import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
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

  @Input() public loading: boolean;

  @Output() public close: EventEmitter<any> = new EventEmitter();

  public onClose() {
    this.close.emit();
  }
}
