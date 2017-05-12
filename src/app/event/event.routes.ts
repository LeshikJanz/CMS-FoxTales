import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventListComponent } from './list';
import { EventCreateComponent } from './create';

const EVENT_ROUTES: Routes = [
  { path: 'events',    component: EventListComponent },
  { path: 'event',    component: EventCreateComponent },
];

export const EVENT_ROUTING: ModuleWithProviders = RouterModule.forChild(EVENT_ROUTES);
