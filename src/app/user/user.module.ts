import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { Ng2BootstrapModule } from 'ngx-bootstrap';

import { SharedModule } from '../shared';
import { HttpService, AuthService, AuthRequestOptions } from '../shared/core';

import { USER_ROUTING } from './user.routes';

import { UserService } from './user.service';
import { UserListComponent } from './list';
import { UserCreateComponent } from './create';
import { UserEditComponent } from './edit';
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
    Ng2BootstrapModule,
    SharedModule,
    USER_ROUTING,
    FeatureModule
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
    UserService
  ],
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserEditComponent
  ]
})
export class UserModule {
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
