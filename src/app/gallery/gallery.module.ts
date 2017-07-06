import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { HttpService, AuthService, AuthRequestOptions } from '../shared/core';
import { FeatureModule } from '../components/feature.module';
import { FavoriteGalleryComponent } from './favorite-gallery/favorite-gallery.component';
import { GalleryItemListComponent } from '../gallery-items/list/gallery-item-list.component';
import { EventGalleryComponent } from './event-gallery/components/event-gallery.component';
import { EventGalleryContainerComponent } from './event-gallery/container/event-gallery-container.component';
import { GalleryListComponent } from './list/gallery-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    HttpModule,
    FeatureModule,
    DateTimePickerModule,
    RouterModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, Injector]
    },
    {
      provide: RequestOptions,
      useFactory: requestOptionsFactory,
      deps: [AuthService]
    }
  ],
  declarations: [
    FavoriteGalleryComponent,
    GalleryItemListComponent,
    EventGalleryComponent,
    EventGalleryContainerComponent,
    GalleryListComponent,
  ]
})
export class GalleryModule {
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
