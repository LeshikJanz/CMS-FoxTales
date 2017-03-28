import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpModule, JsonpModule} from '@angular/http';
import { dashboardRouting } from './dashboard/dashboard.routing';
import { EventService } from '../event/event.service';
import {ApiService} from './../shared/api.service';

@NgModule({
  imports: [
    CommonModule,
    dashboardRouting
  ],
  declarations: [DashboardComponent],
  providers: [EventService, ApiService]
})
export class DashboardModule { }
