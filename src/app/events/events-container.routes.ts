import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events-container.component';
import { EventListComponent } from '../event/list/event-list.component';
import { EventCreateComponent } from '../event/create/event-create.component';
import { EventGroupsComponent } from '../event-groups/list/event-groups.component';
import { EventGroupCreateComponent } from '../event-groups/create/event-group-create.component';
import { FavoriteGalleryComponent } from '../gallery/favorite-gallery/favorite-gallery.component';

const EVENTS_ROUTES: Routes = [
  {
    path: '', component: EventsComponent,
    children: [
      {path: '', redirectTo: 'events'},
      {
        path: 'events', component: EventListComponent
      },
      {path: 'create-event', component: EventCreateComponent},
      {path: 'event-groups', component: EventGroupsComponent},
      {path: 'event-group', component: EventGroupCreateComponent},
      {path: 'favorited-media', component: FavoriteGalleryComponent}
    ]
  },
];

export const EVENTS_ROUTING: ModuleWithProviders = RouterModule.forChild(EVENTS_ROUTES);
