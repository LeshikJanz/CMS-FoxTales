import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExperienceListComponent } from './list';
import { ExperienceCreateComponent } from './create';

const EXPERIENCE_ROUTES: Routes = [
  { path: '',    redirectTo: 'experience' },
  { path: 'experience/:id',    component: ExperienceListComponent },
  { path: 'experience', component: ExperienceCreateComponent },
];

export const EXPERIENCE_ROUTING: ModuleWithProviders = RouterModule.forChild(EXPERIENCE_ROUTES);
