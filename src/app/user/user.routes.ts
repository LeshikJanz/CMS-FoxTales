import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './list';
import { UserCreateComponent } from './create';
import { UserEditComponent } from './edit';

const USER_ROUTES: Routes = [
  { path: 'users',    component: UserListComponent },
  { path: 'user',     component: UserCreateComponent },
  { path: 'user/:id', component: UserEditComponent }
];

export default RouterModule.forChild(USER_ROUTES);
