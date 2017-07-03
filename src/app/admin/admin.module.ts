import { Injector, NgModule } from '@angular/core';
import { RequestOptions, XHRBackend } from '@angular/http';
import { FeatureModule } from '../components/feature.module';
import { HttpService } from '../shared/core';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { ADMIN_ROUTING } from './admin.routes';
import { ClientCreateHeaderComponent } from './headers/client-create-header/client-create-header.component';
import { ClientEditHeaderComponent } from './headers/client-edit-header/client-edit-header.component';
import { ClientsHeaderComponent } from './headers/clients-header/cliens-header.component';
import { DevicesHeaderComponent } from './headers/devices-header/devices-header.component';
import { DeviceCreateHeaderComponent } from './headers/device-create-header/device-create-header.component';
import { DeviceEditHeaderComponent } from './headers/device-edit-header/device-edit-header.component';
import { DeviceDetailsHeaderComponent } from './headers/device-details-header/device-details-header.component';
import { UserCreateHeaderComponent } from './headers/user-create-header/user-create-header.component';
import { UserEditHeaderComponent } from './headers/user-edit-header/user-edit-header.component';
import { UsersHeaderComponent } from './headers/users-header/users-header.component';
import { DeviceRenameModule } from '../hardware/rename/rename.module';
import { SettingsEditModule } from '../hardware/settings/settings-edit.module';
import { UploadFirmwareModule } from '../hardware/upload-firmware/upload-firmware.module';

@NgModule({
  imports: [
    ADMIN_ROUTING,
    FeatureModule,
    SharedModule,
    DeviceRenameModule,
    SettingsEditModule,
    UploadFirmwareModule
  ],
  providers: [],
  declarations: [
    AdminComponent,
    UsersHeaderComponent,
    ClientsHeaderComponent,
    ClientCreateHeaderComponent,
    ClientEditHeaderComponent,
    UserCreateHeaderComponent,
    UserEditHeaderComponent,
    DevicesHeaderComponent,
    DeviceCreateHeaderComponent,
    DeviceDetailsHeaderComponent,
    DeviceEditHeaderComponent
  ]
})
export class AdminModule {
}

/**
 * Http factory
 *
 * @param {XHRBackend} backend - Connection backend
 * @param {RequestOptions} defaultOptions - Request options object
 * @param {Injector} injector - Injector interface
 * @returns {HttpService} - Http service
 */
export function httpFactory(backend: XHRBackend,
                            defaultOptions: RequestOptions,
                            injector: Injector) {
  return new HttpService(backend, defaultOptions, injector);
}
