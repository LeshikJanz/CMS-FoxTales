import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExperienceListComponent } from './list';
import { ExperienceCreateComponent } from './create';
import { ExperienceComponent } from './experience.component';
import { ExperienceContentComponent } from './content/experience-content';
import { GalleryItemListComponent } from '../gallery-items/list/gallery-item-list.component';
import { ExperienceGalleryComponent } from '../gallery/experience-gallery/experience-gallery.component';

const EXPERIENCE_ROUTES: Routes = [
  {
    path: '',  component: ExperienceComponent, children: [
    {path: '', component: ExperienceListComponent, pathMatch: 'full'},
    {path: ':id/content', component: ExperienceContentComponent},
    {path: 'content', component: ExperienceCreateComponent},
    {
      path: ':id', children: [
      {path: 'exgalleries', component: ExperienceGalleryComponent},
      {path: 'exgalleries/:id', component: GalleryItemListComponent},
    ]
    },
  ]
  },

];

export const EXPERIENCE_ROUTING: ModuleWithProviders = RouterModule.forChild(EXPERIENCE_ROUTES);
