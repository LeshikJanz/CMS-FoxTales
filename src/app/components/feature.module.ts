import { UploadButtonComponent } from './uploadButton/upload-button.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FEATURE_ROUTES } from './feature.routing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreationButtonComponent } from './creationButton/creation-button.component';
import { DropDownSelectComponent } from './dropdowns/dropdown-select/dropdown-select.component';
import { ExperienceNavigationComponent }
  from './navigations/experience-navigation/experience-navigation.component';
import { MainNavigationComponent } from './navigations/main-navigation/main-navigation.component';
import { EventComponent } from './event/event.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DropDownComponent } from './dropdowns/dropdown/dropdown.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ActionDropDownComponent } from './dropdowns/action-dropdown/action-dropdown.component';
import { ProfileImgComponent } from './profile-img/profile-img.component';
import { AdminNavigationComponent }
  from './navigations/admin-navigation/admin-navigation.component';
import { TableDropDownComponent } from './dropdowns/table-dropdown/table-dropdown.component';
import { FoxButtonComponent } from './buttons/fox-button/fox-button.component';

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
    ExperienceNavigationComponent,
    AdminNavigationComponent,
    MainNavigationComponent,
    EventComponent,
    CheckboxComponent,
    DropDownComponent,
    ActionDropDownComponent,
    ProfileImgComponent,
    TableDropDownComponent,
    FoxButtonComponent
  ],
  exports: [
    CreationButtonComponent,
    UploadButtonComponent,
    DropDownSelectComponent,
    CommonModule,
    FormsModule,
    ExperienceNavigationComponent,
    MainNavigationComponent,
    AdminNavigationComponent,
    CheckboxComponent,
    DropDownComponent,
    ActionDropDownComponent,
    ProfileImgComponent,
    TableDropDownComponent,
    FoxButtonComponent
  ]
})

export class FeatureModule {
}
