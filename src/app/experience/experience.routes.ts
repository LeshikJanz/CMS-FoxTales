import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExperienceListComponent } from './list';

const EXPERIENCE_ROUTES: Routes = [
  { path: '',    redirectTo: 'experience' },
  { path: 'experience/:id',    component: ExperienceListComponent },
];

export const EXPERIENCE_ROUTING: ModuleWithProviders = RouterModule.forChild(EXPERIENCE_ROUTES);
