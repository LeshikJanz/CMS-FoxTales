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
import { SharedModule } from '../shared/shared.module';
import { EventService } from '../event/event.service';
import { EventGroupsService } from '../event-groups/list/event-groups.service';
import { GalleryItemsContainerComponent } from '../gallery-items/gallery-items-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EVENTS_ROUTING,
    FeatureModule,
    ReactiveFormsModule,
    CustomFormsModule,
    TagInputModule,
    SharedModule,
    FeatureModule
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
    EventGroupCreateComponent
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
