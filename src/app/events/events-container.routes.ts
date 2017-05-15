import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events-container.component';

const EVENTS_ROUTES: Routes = [
      {
    path: '', component: EventsComponent,
    loadChildren: 'app/event/event.module#EventModule'
  },
];

export const EVENTS_ROUTING: ModuleWithProviders = RouterModule.forChild(EVENTS_ROUTES);
