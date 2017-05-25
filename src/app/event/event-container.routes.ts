import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperienceComponent } from './experience.component';
import { EventContainerComponent } from './event-container.component';
import { ExperienceListComponent } from '../experience/list/experience-list.component';
import { GalleryItemListComponent } from '../gallery-items/list/gallery-item-list.component';
import { GalleryListComponent } from '../gallery/list/gallery-list.component';
import { EventGalleryComponent } from '../gallery/event-gallery/event-gallery.component';

const EVENT_ROUTES: Routes = [
  {
    path: '', component: EventContainerComponent,
    children: [
      {path: ':id/experiences', component: ExperienceListComponent},
      {
        path: ':id', children: [
        {path: 'galleries', pathMatch: 'full', component: EventGalleryComponent},
        {path: 'galleries/:id', pathMatch: 'full', component: GalleryItemListComponent},
      ]
      },
    ]
  },

];

export const EVENT_ROUTING: ModuleWithProviders = RouterModule.forChild(EVENT_ROUTES);
