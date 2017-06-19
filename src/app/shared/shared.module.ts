import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import { AuthService, HttpService, AuthRequestOptions, IsAllowedDirective } from './core';
import { TableComponent, FormatPipe, ImagePipe } from './table';
import { FeatureModule } from '../components/feature.module';
import { DefaultPipe } from './table/pipe/default.pipe';
import { FirstNamePipe } from './table/pipe/firstName.pipe';
import { TemperaturePipe } from './table/pipe/temperature.pipe';
import { BooleanPipe } from './table/pipe/boolean.pipe';
import { InternetStatusPipe } from './table/pipe/internet-status.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ToastrModule.forRoot(),
    ToastContainerModule.forRoot(),
    FeatureModule
  ],
  declarations: [
    IsAllowedDirective,
    TableComponent,
    FormatPipe
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
    AuthService,
    ImagePipe,
    DefaultPipe,
    FirstNamePipe,
    DatePipe,
    BooleanPipe,
    InternetStatusPipe,
    TemperaturePipe
  ],
  exports: [
    CommonModule,
    IsAllowedDirective,
    TableComponent
  ]
})
export class SharedModule {
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
