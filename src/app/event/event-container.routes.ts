import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperienceComponent } from './experience.component';
import { EventContainerComponent } from './event-container.component';
import { ExperienceListComponent } from '../experience/list/experience-list.component';
import {
  EventGalleryContainerComponent
} from '../gallery/event-gallery/container/event-gallery-container.component';
import {
  EventGalleryComponent
} from '../gallery/event-gallery/components/event-gallery.component';

const EVENT_ROUTES: Routes = [
  {
    path: '', component: EventContainerComponent,
    children: [
      {path: ':id/experiences', component: ExperienceListComponent},
      {
        path: ':id', children: [
        {path: 'galleries', pathMatch: 'full', component: EventGalleryContainerComponent},
        {path: 'galleries/:id', pathMatch: 'full', component: EventGalleryComponent},
      ]
      },
    ]
  },

];

export const EVENT_ROUTING: ModuleWithProviders = RouterModule.forChild(EVENT_ROUTES);
