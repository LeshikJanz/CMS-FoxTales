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

import { EVENT_ROUTING } from './event.routes';

import { EventService } from './event.service';
import { EventListComponent } from './list';
import { EventCreateComponent } from './create';
import { EventEditComponent } from './edit';

import { FeatureModule } from '../components/feature.module';
import { EventGroupsComponent } from '../event-groups/list/event-groups.component';
import { EventGroupsService } from '../event-groups/list/event-groups.service';
import { EventGroupCreateComponent } from '../event-groups/create/event-group-create.component';
import { GalleryModule } from '../gallery/gallery.module';
import { DateTimePickerModule } from 'ng-pick-datetime';
import * as moment from 'moment';
import { EventRecapReportComponent } from '../event/recap-report/event-recap-report.component';

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
    EVENT_ROUTING,
    FeatureModule,
    GalleryModule,
    DateTimePickerModule,

  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [ XHRBackend, RequestOptions, Injector ]
    },
    EventService,
    EventGroupsService
  ],
  declarations: [
    EventListComponent,
    EventCreateComponent,
    EventGroupsComponent,
    EventGroupCreateComponent,
    EventEditComponent,
    EventRecapReportComponent
  ]
})
export class EventModule {
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
