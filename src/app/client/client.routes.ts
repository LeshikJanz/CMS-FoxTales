import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientListComponent } from './list';
import { ClientCreateComponent } from './create';
import { ClientEditComponent } from './edit';

const CLIENT_ROUTES: Routes = [
  { path: 'admin/clients',    component: ClientListComponent },
  { path: 'admin/client',     component: ClientCreateComponent },
  { path: 'admin/client/:id', component: ClientEditComponent }
];

export const CLIENT_ROUTING: ModuleWithProviders = RouterModule.forChild(CLIENT_ROUTES);
