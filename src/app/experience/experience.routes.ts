import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExperienceListComponent } from './list';
import { ExperienceCreateComponent } from './create';
import { ExperienceComponent } from './experience.component';
import { ExperienceContentComponent } from './content/experience-content';

const EXPERIENCE_ROUTES: Routes = [
  { path: '', component: ExperienceComponent, children: [
    { path: '', component: ExperienceListComponent, pathMatch: 'full' },
    { path: ':id/content',    component: ExperienceContentComponent },
    { path: 'content', component: ExperienceCreateComponent },
    { path: ':id/exgalleries',
      loadChildren: 'app/gallery/experience-gallery/experience-gallery.module#ExperienceGalleryModule'
},
  ]},

];

export const EXPERIENCE_ROUTING: ModuleWithProviders = RouterModule.forChild(EXPERIENCE_ROUTES);
