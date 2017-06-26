import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceCreateComponent } from './create';
import { DeviceDetailsComponent } from './details';
import { DeviceEditComponent } from './edit';
import { DeviceListComponent } from './list';
import { LogDetailsComponent } from './log-details';

const DEVICE_ROUTES: Routes = [
  {path: '', redirectTo: 'devices'},
  {path: 'devices', component: DeviceListComponent},
  {path: 'device', component: DeviceCreateComponent, data: { acl: 'CreateEditDevice' }},
  {path: 'device/:id', component: DeviceDetailsComponent},
  {path: 'device/:id/edit', component: DeviceEditComponent, data: { acl: 'CreateEditDevice' }},
  {path: 'log/:id', component: LogDetailsComponent}
];

export const DEVICE_ROUTING: ModuleWithProviders = RouterModule.forChild(DEVICE_ROUTES);
