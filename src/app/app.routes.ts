import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [

  { path: '',      loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: '',      loadChildren: 'app/event/event.module#EventModule' },
  { path: '',      loadChildren: 'app/experience/experience.module#ExperienceModule' },
  { path: 'admin',      loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: '**',    component: NoContentComponent },
];
