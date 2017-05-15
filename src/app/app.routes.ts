import { Routes } from '@angular/router';
import { AuthGuard } from './shared/core';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [

  { path: '', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivate: [ AuthGuard ] },
  { path: 'events', loadChildren: 'app/events/events-container.module#EventsModule', canActivate: [ AuthGuard ] },
  { path: '**',    component: NoContentComponent }

];
