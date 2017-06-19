import { NgModule, Injector } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpService } from '../shared/core';
import { ADMIN_ROUTING } from './admin.routes';
import { AdminComponent } from './admin.component';
import { FeatureModule } from '../components/feature.module';
import { UsersHeaderComponent } from './headers/users-header/users-header.component';
import { ClientsHeaderComponent } from './headers/clients-header/cliens-header.component';
import { ClientEditHeaderComponent } from './headers/client-edit-header/client-edit-header.component';
import { ClientCreateHeaderComponent } from './headers/client-create-header/client-create-header.component';
import { UserCreateHeaderComponent } from './headers/user-create-header/user-create-header.component';

@NgModule({
  imports: [
    ADMIN_ROUTING,
    FeatureModule
  ],
  providers: [],
  declarations: [
    AdminComponent,
    UsersHeaderComponent,
    ClientsHeaderComponent,
    ClientCreateHeaderComponent,
    ClientEditHeaderComponent,
    UserCreateHeaderComponent
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
