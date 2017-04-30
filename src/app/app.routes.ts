import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      loadChildren: 'app/user/user.module#UserModule' },
  { path: '**',    component: NoContentComponent },
];
