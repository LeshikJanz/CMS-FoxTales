import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events-container.component';
import { EventListComponent } from '../event/list/event-list.component';
import { EventCreateComponent } from '../event/create/event-create.component';
import { EventGroupsComponent } from '../event-groups/list/event-groups.component';
import { EventEditComponent } from '../event/edit/event-edit.component';
import { FavoriteGalleryComponent } from '../gallery/favorite-gallery/favorite-gallery.component';
import { EventGroupEditComponent } from '../event-groups/edit/event-group-edit.component';
import { EventGroupCreateComponent } from '../event-groups/create/event-group-create.component';
import { EventRecapReportComponent } from '../event/recap-report/event-recap-report.component';

const EVENTS_ROUTES: Routes = [
  {
    path: '', component: EventsComponent,
    children: [
      {path: '', redirectTo: 'events'},
      {
        path: 'events', component: EventListComponent, data: { acl: 'ViewEventList' }
      },
      {path: 'edit-event/:id', component: EventEditComponent, data: { acl: 'CreateEditEvents' } },
      {path: 'create-event', component: EventCreateComponent, data: { acl: 'CreateEditEvents' }},
      {
        path: 'recap-report/:id',
        component: EventRecapReportComponent,
        data: { acl: 'ViewSendRecapReport' }
      },
      {path: 'event-groups', component: EventGroupsComponent},
      {path: 'event-group', component: EventGroupCreateComponent},
      {path: 'event-group/:id', component: EventGroupEditComponent},
      {path: 'favorited-media', component: FavoriteGalleryComponent}
    ]
  },
];

export const EVENTS_ROUTING: ModuleWithProviders = RouterModule.forChild(EVENTS_ROUTES);
