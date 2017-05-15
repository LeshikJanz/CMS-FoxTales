import { NgModule, Injector } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpService } from '../shared/core';
import { EVENTS_ROUTING } from './events-container.routes';
import { EventsComponent } from './events-container.component';
import { FeatureModule } from '../components/feature.module';

@NgModule({
  imports: [
    EVENTS_ROUTING,
    FeatureModule
  ],
  providers: [],
  declarations: [EventsComponent]
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
