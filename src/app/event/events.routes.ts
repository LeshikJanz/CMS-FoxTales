import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventListComponent } from './list';
import { EventCreateComponent } from './create';
import { EventGroupsComponent } from '../event-groups/list/event-groups.component';
import { EventGroupCreateComponent } from '../event-groups/create/event-group-create.component';

const EVENT_ROUTES: Routes = [
  {path: '', redirectTo: 'events'},
  {
    path: 'events', component: EventListComponent
  },
  {path: 'create-event', component: EventCreateComponent},
  {path: 'event-groups', component: EventGroupsComponent},
  {path: 'event-group', component: EventGroupCreateComponent}
];

export const EVENTS_ROUTING: ModuleWithProviders = RouterModule.forChild(EVENT_ROUTES);
