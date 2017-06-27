import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientListComponent } from './list';
import { ClientCreateComponent } from './create';
import { ClientEditComponent } from './edit';
import { ClientLicenseComponent } from './license';

const CLIENT_ROUTES: Routes = [
  { path: 'clients',    component: ClientListComponent },
  // { path: 'client',     component: ClientCreateComponent, data: { acl: 'CreateClient' } },
  { path: 'client/:id', component: ClientEditComponent, pathMatch: 'prefix',
    data: { acl: 'BasicClientEdit' } },
  {
    path:
    'client/:id/license',
    component: ClientLicenseComponent,
    pathMatch: 'prefix',
    data: { acl: 'ViewLicenseList' }
  }
];

export const CLIENT_ROUTING: ModuleWithProviders = RouterModule.forChild(CLIENT_ROUTES);
