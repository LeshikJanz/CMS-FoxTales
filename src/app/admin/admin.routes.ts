import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const ADMIN_ROUTES: Routes = [
  {
    path: '', component: AdminComponent,
    loadChildren: 'app/user/user.module#UserModule'
  },
  {
    path: '', component: AdminComponent,
    loadChildren: 'app/client/client.module#ClientModule'
  },
  {
    path: '', component: AdminComponent,
    loadChildren: 'app/hardware/device.module#DeviceModule'
  },
];

export const ADMIN_ROUTING: ModuleWithProviders = RouterModule.forChild(ADMIN_ROUTES);
