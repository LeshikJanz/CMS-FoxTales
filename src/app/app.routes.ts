import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: '**',    component: NoContentComponent },
];
