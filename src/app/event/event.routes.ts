import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventListComponent } from './list';
import { EventCreateComponent } from './create';
import { EventGroupsComponent } from "../event-groups/event-groups.component";

const EVENT_ROUTES: Routes = [
  { path: '',    redirectTo: 'events' },
  { path: 'events',    component: EventListComponent },
  { path: 'event',    component: EventCreateComponent },
  { path: 'event-groups',    component: EventGroupsComponent },
];

export const EVENT_ROUTING: ModuleWithProviders = RouterModule.forChild(EVENT_ROUTES);
