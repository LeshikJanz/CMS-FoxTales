import { NgModule, Injector } from '@angular/core';
import { RequestOptions, XHRBackend } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { HttpService } from '../shared/core';
import { FeatureModule } from '../components/feature.module';
import { EVENT_ROUTING } from './event-container.routes';
import { EventContainerComponent } from './event-container.component';
import { ExperienceListComponent } from '../experience/list/experience-list.component';
import { ExperienceService } from '../experience/experience.service';
import { GalleryItemListComponent } from '../gallery-items/list/gallery-item-list.component';
import { GalleryService } from '../gallery/gallery.service';
import { GalleryListComponent } from '../gallery/list/gallery-list.component';
import { EventGalleryComponent } from '../gallery/event-gallery/components/event-gallery.component';
import {
  EventGalleryContainerComponent
} from '../gallery/event-gallery/container/event-gallery-container.component';
import { EventService } from './event.service';
import { FavoriteGalleryComponent } from '../gallery/favorite-gallery/favorite-gallery.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2BootstrapModule,
    EVENT_ROUTING,
    FeatureModule,
  ],
  providers: [
    ExperienceService,
    GalleryService,
    EventService
  ],
  declarations: [
    EventContainerComponent,
    ExperienceListComponent,
    GalleryListComponent,
    EventGalleryComponent,
    EventGalleryContainerComponent
  ],
  exports: [
    ExperienceListComponent,
    GalleryListComponent,
    EventGalleryComponent,
    EventGalleryContainerComponent
  ]
})
export class EventContainerModule {
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
