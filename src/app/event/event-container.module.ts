import { NgModule, Injector } from '@angular/core';
import { RequestOptions, XHRBackend } from '@angular/http';
import { HttpService } from '../shared/core';
import { FeatureModule } from '../components/feature.module';
import { EVENT_ROUTING } from "./event-container.routes";
import { EventContainerComponent } from './event-container.component';
import { ExperienceListComponent } from '../experience/list/experience-list.component';
import { ExperienceService } from '../experience/experience.service';

@NgModule({
  imports: [
    EVENT_ROUTING,
    FeatureModule,
  ],
  providers: [ExperienceService],
  declarations: [
    EventContainerComponent,
    ExperienceListComponent
  ],
  exports: [
    ExperienceListComponent
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
