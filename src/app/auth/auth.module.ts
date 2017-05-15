import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AUTH_ROUTING } from './auth.routes';

import { AuthService } from '../shared/core';
import { AuthComponent } from './auth.component';
import { FoxButtonComponent } from "../components/buttons/fox-button/fox-button.component";
import { FeatureModule } from "../components/feature.module";

@NgModule({
  imports: [
    CommonModule,
    AUTH_ROUTING,
    FeatureModule
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
