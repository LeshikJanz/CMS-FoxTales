import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { DateTimePickerModule } from 'ng-pick-datetime'

import { SharedModule } from '../shared';
import { HttpService, AuthService, AuthRequestOptions } from '../shared/core';

import { DEVICE_ROUTING } from './device.routes';

import { DeviceService } from './device.service';
import { DeviceListComponent } from './list';
import { DeviceCreateComponent } from './create';
import { DeviceDetailsComponent } from './details';
import { DeviceEditComponent } from './edit';
import { LogDetailsComponent } from './log-details';

import { FeatureModule } from '../components/feature.module';

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
      deps: [ XHRBackend, RequestOptions, Injector ]
    },
    {
      provide: RequestOptions,
      useFactory: requestOptionsFactory,
      deps: [ AuthService ]
    },
    DeviceService
  ],
  declarations: [
    DeviceListComponent,
    DeviceCreateComponent,
    DeviceDetailsComponent,
    DeviceEditComponent,
    LogDetailsComponent
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
