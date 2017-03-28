import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';


import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientEditComponent } from './clients/client-edit/client-edit.component';
import { ClientCreateComponent } from './clients/client-create/client-create.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { UserComponent } from './user/user.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { EventComponent } from './event/event.component';
import { EventEditComponent } from './event/event-edit/event-edit.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventCollectionComponent } from './event/event-collection/event-collection.component';
import { EventsComponent } from './event/events/events.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { LoginComponent } from './login/login.component';
import { ConfirmationComponent } from './login/confirmation/confirmation.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetpasswordComponent } from './login/resetpassword/resetpassword.component';
import { routing } from './app.routing';
import { LoginService } from './login/login.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { MomentModule } from 'angular2-moment';
import {NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentListComponent } from './content-list/content-list.component';
import { CalendarModule } from 'angular-calendar';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientEditComponent,
    ClientCreateComponent,
    ClientListComponent,
    UserComponent,
    UserCreateComponent,
    UserEditComponent,
    UserManagementComponent,
    EventComponent,
    EventEditComponent,
    EventListComponent,
    EventCollectionComponent,
    EventsComponent,
    ExperiencesComponent,
    LoginComponent,
    ConfirmationComponent,
    ForgotPasswordComponent,
    ResetpasswordComponent,
    EventComponent,
    ContentListComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DashboardModule,
    MomentModule,
     ReactiveFormsModule,
     NgxDatatableModule,
     MaterialModule,
     CalendarModule.forRoot()
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
