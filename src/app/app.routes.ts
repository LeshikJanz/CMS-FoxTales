import { Routes } from '@angular/router';
import { AuthGuard } from './shared/core';
import { ProfileComponent } from './profile';
import { NoContentComponent } from './no-content';
import { ForbiddenComponent } from './forbidden';
import { DashboardComponent } from './dashboard';

export const ROUTES: Routes = [
  { path: '', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canActivate: [ AuthGuard ]
  },
  {
    path: 'events',
    loadChildren: 'app/events/events-container.module#EventsModule',
    canActivate: [ AuthGuard ]
  },
  {
    path: 'event',
    loadChildren: 'app/event/event-container.module#EventContainerModule',
    canActivate: [ AuthGuard ]
  },
  {
    path: 'experience',
    loadChildren: 'app/experience/experience.module#ExperienceModule',
    canActivate: [ AuthGuard ]
  },
  { path: 'experience-builder',
    loadChildren: 'app/experience-builder/experience-builder.module#ExperienceBuilderModule',
    canActivate: [ AuthGuard ]
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**',    component: NoContentComponent }
];
