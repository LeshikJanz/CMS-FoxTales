import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      loadChildren: 'app/user/user.module#UserModule' },
  { path: '',      loadChildren: 'app/client/client.module#ClientModule' },
  { path: '**',    component: NoContentComponent },
];
