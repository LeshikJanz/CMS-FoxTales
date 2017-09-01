import { sandboxOf } from 'angular-playground';
import { DeviceInfoComponent } from './device-info.component';
import { FoxButtonComponent } from '../buttons/fox-button/fox-button.component';

export default sandboxOf(DeviceInfoComponent, { declarations: [FoxButtonComponent] })
  .add('device-info', {
    template: `<device-info></device-info>`
  });
