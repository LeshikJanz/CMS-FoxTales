import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AUTH_ROUTING } from './auth.routes';

import { AuthService } from '../shared/core';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    AUTH_ROUTING
  ],
  providers: [
    AuthService
  ],
  declarations: [
    AuthComponent
  ]
})
export class AuthModule {
}
