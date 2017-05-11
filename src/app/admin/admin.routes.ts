import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const ADMIN_ROUTES: Routes = [
  { path: 'admin',    component: AdminComponent }
];

export const ADMIN_ROUTING: ModuleWithProviders = RouterModule.forChild(ADMIN_ROUTES);
