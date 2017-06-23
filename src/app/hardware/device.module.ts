import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { CustomFormsModule } from 'ng2-validation';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';

import { FeatureModule } from '../components/feature.module';

import { SharedModule } from '../shared';
import { AuthRequestOptions, AuthService, HttpService } from '../shared/core';
import { DeviceCreateComponent } from './create';
import { DeviceDetailsComponent } from './details';

import { DEVICE_ROUTING } from './device.routes';

import { DeviceService } from './device.service';
import { DeviceEditComponent } from './edit';
import { DeviceListComponent } from './list';
import { LogDetailsComponent } from './log-details';
import { RenameComponent } from './rename';
import { SettingsEditComponent } from './settings';
import { UploadFirmwareComponent } from './upload-firmware';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    HttpModule,
    NgxErrorsModule,
    ToastrModule.forRoot(),
    ToastContainerModule.forRoot(),
    SharedModule,
    DEVICE_ROUTING,
    FeatureModule,
    Ng2BootstrapModule,
    DateTimePickerModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, Injector]
    },
    {
      provide: RequestOptions,
      useFactory: requestOptionsFactory,
      deps: [AuthService]
    },
    DeviceService
  ],
  declarations: [
    DeviceListComponent,
    DeviceCreateComponent,
    DeviceDetailsComponent,
    DeviceEditComponent,
    LogDetailsComponent,
    SettingsEditComponent,
    RenameComponent,
    UploadFirmwareComponent
  ]
})
export class DeviceModule {
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

/**
 * Request options factory
 *
 * @param {AuthService} auth - Auth service
 * @returns {AuthRequestOptions} - Request options
 */
export function requestOptionsFactory(auth: AuthService) {
  return new AuthRequestOptions(auth);
}
