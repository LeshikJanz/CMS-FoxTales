import { NgModule, Injector } from '@angular/core';
import { RequestOptions, XHRBackend } from '@angular/http';
import { HttpService } from '../shared/core';
import { FeatureModule } from '../components/feature.module';
import { EVENT_ROUTING } from './event-container.routes';
import { EventContainerComponent } from './event-container.component';
import { ExperienceListComponent } from '../experience/list/experience-list.component';
import { ExperienceService } from '../experience/experience.service';
import { GalleryItemListComponent } from '../gallery-items/list/gallery-item-list.component';
import { GalleryService } from '../gallery/gallery.service';
import { GalleryListComponent } from '../gallery/list/gallery-list.component';
import { EventGalleryComponent } from '../gallery/event-gallery/event-gallery.component';
import { GalleryItemsContainerComponent } from '../gallery-items/gallery-items-container.component';

@NgModule({
  imports: [
    EVENT_ROUTING,
    FeatureModule,
  ],
  providers: [ExperienceService, GalleryService],
  declarations: [
    EventContainerComponent,
    ExperienceListComponent,
    GalleryItemListComponent,
    GalleryListComponent,
    EventGalleryComponent,
    GalleryItemsContainerComponent
  ],
  exports: [
    ExperienceListComponent,
    GalleryItemListComponent,
    GalleryListComponent,
    EventGalleryComponent,
    GalleryItemsContainerComponent
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
