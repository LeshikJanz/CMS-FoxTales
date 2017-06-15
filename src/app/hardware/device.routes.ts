import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceListComponent } from './list';
import { DeviceCreateComponent } from './create';

const DEVICE_ROUTES: Routes = [
  { path: '',    redirectTo: 'users' },
  { path: 'devices',    component: DeviceListComponent },
  { path: 'device',     component: DeviceCreateComponent },
  // { path: 'device/:id', component: DeviceEditComponent }
];

export const DEVICE_ROUTING: ModuleWithProviders = RouterModule.forChild(DEVICE_ROUTES);
