import { UploadButtonComponent } from './uploadButton/upload-button.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FEATURE_ROUTES } from './feature.routing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreationButtonComponent } from './creationButton/creation-button.component';
import { DropDownSelectComponent } from './dropdown-select/dropdown-select.component';
import { NavigationComponent } from './admin-navigation/admin-navigation.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { EventComponent } from './event/event.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DropDownComponent } from "./dropdown/dropdown.component";
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(FEATURE_ROUTES),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  declarations: [
    CreationButtonComponent,
    UploadButtonComponent,
    DropDownSelectComponent,
    NavigationComponent,
    MainNavigationComponent,
    EventComponent,
    CheckboxComponent,
    DropDownComponent
  ],
  exports: [
    CreationButtonComponent,
    UploadButtonComponent,
    DropDownSelectComponent,
    CommonModule,
    FormsModule,
    NavigationComponent,
    MainNavigationComponent,
    CheckboxComponent,
    DropDownComponent
  ]
})

export class FeatureModule {
}
