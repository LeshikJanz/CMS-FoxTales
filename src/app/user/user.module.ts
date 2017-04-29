import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

import { HttpService } from '../shared';

import USER_ROUTES from './user.routes';

import { UserService } from './user.service';
import { UserListComponent } from './list';
import { UserCreateComponent } from './create';
import { UserEditComponent } from './edit';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxErrorsModule,
    ToastrModule.forRoot(),
    ToastContainerModule.forRoot(),
    USER_ROUTES
  ],
  providers: [
    {
      provide: Http,
      useFactory: (
        backend: XHRBackend,
        defaultOptions: RequestOptions,
        injector: Injector
      ) => new HttpService(backend, defaultOptions, injector),
      deps: [ XHRBackend, RequestOptions, Injector ]
    },
    UserService
  ],
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserEditComponent
  ]
})
export default class UserModule {
}
