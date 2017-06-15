import { NgModule, Injector } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpService } from '../shared/core';
import { EVENTS_ROUTING } from './events-container.routes';
import { EventsComponent } from './events-container.component';
import { FeatureModule } from '../components/feature.module';
import { EventListComponent } from '../event/list/event-list.component';
import { EventCreateComponent } from '../event/create/event-create.component';
import { EventGroupsComponent } from '../event-groups/list/event-groups.component';
import { EventGroupCreateComponent } from '../event-groups/create/event-group-create.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { TagInputModule } from 'ng2-tag-input';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { EventService } from '../event/event.service';
import { EventGroupsService } from '../event-groups/list/event-groups.service';
import { EventGroupEditComponent } from '../event-groups/edit/event-group-edit.component';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { EventEditComponent } from  '../event/edit/event-edit.component';
import { EventRecapReportComponent } from '../event/recap-report/event-recap-report.component';
import { ChartModule } from 'angular2-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EVENTS_ROUTING,
    FeatureModule,
    Ng2BootstrapModule,
    ReactiveFormsModule,
    CustomFormsModule,
    TagInputModule,
    SharedModule,
    DateTimePickerModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  providers: [
    EventService,
    EventGroupsService
  ],
  declarations: [
    EventsComponent,
    EventListComponent,
    EventCreateComponent,
    EventGroupsComponent,
    EventGroupCreateComponent,
    EventGroupEditComponent,
    EventEditComponent,
    EventRecapReportComponent
  ]
})
export class EventsModule {
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
