import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { TagInputModule } from 'ng2-tag-input';

import { FeatureModule } from '../../components/feature.module';
import { GALLERY_ROUTING } from './experience-gallery.routes';
import { GalleryService } from '../gallery.service';
import { GalleryItemListComponent } from '../../gallery-items/list/gallery-item-list.component';
import { GalleryListComponent } from '../list/gallery-list.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpService } from '../../shared/core/http/http.service';
import { EventGalleryModule } from '../event-gallery/event-gallery.module';
import { ExperienceGalleryComponent } from './experience-gallery.component';

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
    FeatureModule,
    GALLERY_ROUTING,
    EventGalleryModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [ XHRBackend, RequestOptions, Injector ]
    },
    GalleryService
  ],
  declarations: [ExperienceGalleryComponent]
})
export class ExperienceGalleryModule {
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
