import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceCreateComponent } from './create';
import { DeviceDetailsComponent } from './details';

import { DeviceListComponent } from './list';
import { LogDetailsComponent } from './log-details';

const DEVICE_ROUTES: Routes = [
  {path: '', redirectTo: 'users'},
  {path: 'devices', component: DeviceListComponent},
  {path: 'device', component: DeviceCreateComponent},
  {path: 'device/:id', component: DeviceDetailsComponent},
  {path: 'log/:id', component: LogDetailsComponent}
];

export const DEVICE_ROUTING: ModuleWithProviders = RouterModule.forChild(DEVICE_ROUTES);
