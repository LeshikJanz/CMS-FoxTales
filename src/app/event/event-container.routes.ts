import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperienceComponent } from './experience.component';
import { EventContainerComponent } from './event-container.component';
import { ExperienceListComponent } from "../experience/list/experience-list.component";

const EVENT_ROUTES: Routes = [
  {
    path: '', component: EventContainerComponent,
    children: [
      {path: ':id/experiences', component: ExperienceListComponent},
      {
        path: ':id/galleries', loadChildren: 'app/gallery/event-gallery/event-gallery.module#EventGalleryModule'
      },
    ]
  },

];

export const EVENT_ROUTING: ModuleWithProviders = RouterModule.forChild(EVENT_ROUTES);
