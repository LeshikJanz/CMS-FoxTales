import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { TagInputModule } from 'ng2-tag-input';

import { GALLERY_ROUTING } from './event-gallery.routes';
import { GalleryListComponent } from '../list/gallery-list.component';
import { GalleryItemListComponent } from '../../gallery-items/list/gallery-item-list.component';
import { GalleryService } from '../gallery.service';
import { FeatureModule } from '../../components/feature.module';
import { SharedModule } from '../../shared/shared.module';
import { HttpService } from '../../shared/core/http/http.service';

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
    GALLERY_ROUTING
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [ XHRBackend, RequestOptions, Injector ]
    },
    GalleryService
  ],
  declarations: [
    GalleryListComponent,
    GalleryItemListComponent,
  ]
})
export class EventGalleryModule {
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
