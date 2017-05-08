import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';

import { HttpService } from '../shared';

import { CLIENT_ROUTING } from './client.routes';

import { ClientService } from './client.service';
import { ClientListComponent } from './list';
import { ClientCreateComponent } from './create';
import { ClientEditComponent } from './edit';

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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAW7s_PMAH6CJRMMXRVWnQPevWqipMkCyA',
      libraries: [ 'places' ]
    }),
    CLIENT_ROUTING
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [ XHRBackend, RequestOptions, Injector ]
    },
    ClientService
  ],
  declarations: [
    ClientListComponent,
    ClientCreateComponent,
    ClientEditComponent
  ]
})
export class ClientModule {
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
