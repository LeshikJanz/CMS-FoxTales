import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './list';
import { UserCreateComponent } from './create';
import { UserEditComponent } from './edit';

const USER_ROUTES: Routes = [
  { path: '',    redirectTo: 'users' },
  { path: 'users',    component: UserListComponent },
  { path: 'user',     component: UserCreateComponent },
  { path: 'user/:id', component: UserEditComponent }
];

export const USER_ROUTING: ModuleWithProviders = RouterModule.forChild(USER_ROUTES);
