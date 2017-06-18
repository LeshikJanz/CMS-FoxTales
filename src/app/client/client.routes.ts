import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientListComponent } from './list';
import { ClientCreateComponent } from './create';
import { ClientEditComponent } from './edit';
import { ClientLicenseComponent } from './license';

const CLIENT_ROUTES: Routes = [
  { path: 'clients',    component: ClientListComponent },
  { path: 'client',     component: ClientCreateComponent },
  { path: 'client/:id', component: ClientEditComponent },
  { path: 'client/:id/license', component: ClientLicenseComponent }
];

export const CLIENT_ROUTING: ModuleWithProviders = RouterModule.forChild(CLIENT_ROUTES);
