import { Routes } from '@angular/router';
import { AuthGuard } from './shared/core';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: '', loadChildren: 'app/user/user.module#UserModule', canActivate: [ AuthGuard ] },
  { path: '', loadChildren: 'app/client/client.module#ClientModule', canActivate: [ AuthGuard ] },
  { path: '**', component: NoContentComponent },
];
