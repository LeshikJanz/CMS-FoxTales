import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker'

import { SharedModule } from '../shared';
import { HttpService, AuthService, AuthRequestOptions } from '../shared/core';

import { ExperienceBuilderIntroComponent } from './experience-builder-intro';
import { ExperienceBuilderContainerComponent } from './experience-builder-container';
import { BasicDetailsComponent } from './basic-details';
import { UIBuilderComponent } from './ui-builder';
import { EmailBuilderComponent } from './email-builder';
import { ContentOptionsComponent } from './content-options';

import { EXPERIENCE_BUILDER_ROUTING } from './experience-builder.routes';

import { FeatureModule } from '../components/feature.module';

import { ExperienceBuilderService } from './experience-builder.service'

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
    EXPERIENCE_BUILDER_ROUTING,
    FeatureModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ColorPickerModule
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
    ExperienceBuilderService
  ],
  declarations: [
      ExperienceBuilderIntroComponent,
      ExperienceBuilderContainerComponent,
      BasicDetailsComponent,
      UIBuilderComponent,
      EmailBuilderComponent,
      ContentOptionsComponent
  ]
})
export class ExperienceBuilderModule {
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
