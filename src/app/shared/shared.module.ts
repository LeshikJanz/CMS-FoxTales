import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './core';
import { TableComponent, FormatPipe, ImagePipe } from './table';
import { FeatureModule } from '../components/feature.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeatureModule
  ],
  declarations: [
    TableComponent,
    FormatPipe
  ],
  providers: [
    AuthService,
    ImagePipe
  ],
  exports: [
    CommonModule,
    TableComponent
  ]
})
export class SharedModule {
}
