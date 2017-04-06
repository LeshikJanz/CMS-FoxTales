import {Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
// import { UserManagementComponent } from './user-management.component';
// import { UserFormComponent } from './user-component';
// import { ClientComponent } from './../clients/client.component';
// import { ClientCreateComponent } from './../clients/client.create.component';
import { EventsComponent } from '../../event/events/events.component';
import { EventComponent } from '../../event/event.component';
// import { ClientEditComponent } from '../clients/client-edit.component';
// import { EventEditComponent } from '../events/event-edit.component';
import {ExperiencesComponent} from 'app/experiences/experiences.component';
// import {UserCreateComponent} from './user-create.component';
// import {UserEditComponent} from './user-edit.component';
import { ContentListComponent } from '../../content-list/content-list.component';
import { ExperienceBuilderComponent } from '../../experience-builder/experience-builder.component';

const dashboardRoutes: Routes = [
        
        {path: '', component: DashboardComponent,
            children: [
            //     {path: 'users', component: UserManagementComponent },
            //     {path: 'user', component: UserCreateComponent},
            //     {path: 'user/:id', component: UserEditComponent},
            //     {path: 'clients', component: ClientComponent},
            //     {path: 'client', component: ClientCreateComponent},
            //     {path: 'client/:id', component: ClientEditComponent},
                {path: 'events', component: EventsComponent},
                {path: 'event', component: EventComponent},
            //     {path: 'event/:id', component: EventEditComponent},
                {path: 'events/:eventId/experience', component: ExperiencesComponent},
                {path: 'events/:eventId/experience/content-list/:experienceId', component: ContentListComponent },
                {path: 'experiencebuilder', component: ExperienceBuilderComponent }
            ]
        }
]


export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
// export const dashboardRouting = RouterModule.forRoot(dashboardRoutes);