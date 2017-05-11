import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      loadChildren: 'app/user/user.module#UserModule' },
  { path: '',      loadChildren: 'app/client/client.module#ClientModule' },
  { path: '',      loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: '',      loadChildren: 'app/event/event.module#EventModule' },
  { path: '',      loadChildren: 'app/experience/experience.module#ExperienceModule' },
  { path: '**',    component: NoContentComponent },
];
