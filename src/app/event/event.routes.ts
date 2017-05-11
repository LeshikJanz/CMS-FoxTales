import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventListComponent } from './list';

const EVENT_ROUTES: Routes = [
  { path: 'events',    component: EventListComponent },
];

export const EVENT_ROUTING: ModuleWithProviders = RouterModule.forChild(EVENT_ROUTES);
