import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExperienceListComponent } from './list';
import { ExperienceCreateComponent } from './create';
import { ExperienceComponent } from './experience.component';

const EXPERIENCE_ROUTES: Routes = [
  { path: '', component: ExperienceComponent, children: [
    { path: '', redirectTo: 'content', pathMatch: 'full' },
    { path: ':id/content',    component: ExperienceListComponent },
    { path: 'content', component: ExperienceCreateComponent },
    { path: ':id/galleries', loadChildren: 'app/gallery/gallery.module#GalleryModule'
},
  ]},

];

export const EXPERIENCE_ROUTING: ModuleWithProviders = RouterModule.forChild(EXPERIENCE_ROUTES);
