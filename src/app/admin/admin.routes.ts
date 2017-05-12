import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const ADMIN_ROUTES: Routes = [
  { path: 'admin',    component: AdminComponent },
  { path: 'admin',      loadChildren: 'app/user/user.module#UserModule' },
  { path: 'admin',      loadChildren: 'app/client/client.module#ClientModule' },
];

export const ADMIN_ROUTING: ModuleWithProviders = RouterModule.forChild(ADMIN_ROUTES);
