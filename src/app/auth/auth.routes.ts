import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';

const AUTH_ROUTES: Routes = [
  { path: 'auth', component: AuthComponent },
];

export const AUTH_ROUTING: ModuleWithProviders = RouterModule.forChild(AUTH_ROUTES);
