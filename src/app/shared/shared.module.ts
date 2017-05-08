import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableComponent, FormatPipe } from './table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TableComponent,
    FormatPipe
  ],
  providers: [
  ],
  exports: [
    CommonModule,
    TableComponent
  ]
})
export class SharedModule {
}
