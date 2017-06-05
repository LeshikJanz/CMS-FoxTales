import { sandboxOf } from 'angular-playground';
import { DeviceInfoComponent } from './device-info.component';

export default sandboxOf(DeviceInfoComponent)
  .add('device-info', {
    template: `<device-info></device-info>`
  });
