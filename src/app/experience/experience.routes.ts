import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExperienceListComponent } from './list';
import { ExperienceCreateComponent } from './create';
import { ExperienceComponent } from './experience.component';
import { ExperienceContentComponent } from './content/experience-content';
import {
  ExperienceGalleryContainerComponent
} from '../gallery/experience-gallery/container/experience-gallery-container.component';
import {
  ExperienceGalleryComponent
} from '../gallery/experience-gallery/components/experience-gallery.component';

const EXPERIENCE_ROUTES: Routes = [
  {
    path: '', component: ExperienceComponent, children: [
    {path: '', component: ExperienceListComponent, pathMatch: 'full'},
    {path: ':id/content', component: ExperienceContentComponent},
    {path: 'content', component: ExperienceCreateComponent},
    {
      path: ':id', children: [
      {
        path: 'exgalleries', pathMatch: 'full',
        component: ExperienceGalleryContainerComponent
      },
      {
        path: 'exgalleries/:id', pathMatch: 'full',
        component: ExperienceGalleryComponent
      },
    ]
    },
  ]
  },

];

export const EXPERIENCE_ROUTING: ModuleWithProviders = RouterModule.forChild(EXPERIENCE_ROUTES);
