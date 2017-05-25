import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { TagInputModule } from 'ng2-tag-input';

import { SharedModule } from '../shared';
import { HttpService } from '../shared/core';

import { EXPERIENCE_ROUTING } from './experience.routes';

import { ExperienceService } from './experience.service';
import { ExperienceListComponent } from './list';
import { ExperienceCreateComponent } from './create';

import { FeatureModule } from '../components/feature.module';
import { ExperienceComponent } from './experience.component';
import { GalleryModule } from '../gallery/gallery.module';
import { ExperienceContentComponent } from './content/experience-content';
import { EventContainerModule } from '../event/event-container.module';

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
    TagInputModule,
    SharedModule,
    EXPERIENCE_ROUTING,
    FeatureModule,
    GalleryModule,
    EventContainerModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [ XHRBackend, RequestOptions, Injector ]
    },
    ExperienceService
  ],
  declarations: [
    ExperienceCreateComponent,
    ExperienceComponent,
    ExperienceContentComponent
  ]
})
export class ExperienceModule {
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
