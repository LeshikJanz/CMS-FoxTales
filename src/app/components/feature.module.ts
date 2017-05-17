import { UploadButtonComponent } from './uploadButton/upload-button.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FEATURE_ROUTES } from './feature.routing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreationButtonComponent } from './creationButton/creation-button.component';
import { DropDownSelectComponent } from './dropdowns/dropdown-select/dropdown-select.component';
import {
  ExperienceNavigationComponent
}
  from './navigations/experience-navigation/experience-navigation.component';
import { MainNavigationComponent } from './navigations/main-navigation/main-navigation.component';
import { EventComponent } from './event/event.component';
import { CheckboxComponent } from './toggles/checkbox/checkbox.component';
import { DropDownComponent } from './dropdowns/dropdown/dropdown.component';
import { BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { ActionDropDownComponent } from './dropdowns/action-dropdown/action-dropdown.component';
import { ProfileImgComponent } from './profile-img/profile-img.component';
import {
  AdminNavigationComponent
}
  from './navigations/admin-navigation/admin-navigation.component';
import { TableDropDownComponent } from './dropdowns/table-dropdown/table-dropdown.component';
import { FoxButtonComponent } from './buttons/fox-button/fox-button.component';
import { AddButtonComponent } from './buttons/add-button/add-button.component';
import {
  EventNavigationComponent
}
  from './navigations/event-navigation/event-navigation.component';
import { EventGroupComponent } from './eventGroup/event-group.component';
import { FoxInputComponent } from './input/fox-input.component';
import { EventTagComponent } from './eventTag/event-tag.component';
import { SwitcherComponent } from './toggles/switcher/switcher.component';
import { ConfigureButtonComponent } from './buttons/configure-button/configure-button.component';
import { AddEventModalComponent } from './modals/add-event-modal/add-event-modal.component';
import { TagInputModule } from 'ng2-tag-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(FEATURE_ROUTES),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TagInputModule
  ],
  providers: [],
  declarations: [
    CreationButtonComponent,
    UploadButtonComponent,
    DropDownSelectComponent,
    ExperienceNavigationComponent,
    AdminNavigationComponent,
    MainNavigationComponent,
    EventNavigationComponent,
    EventComponent,
    CheckboxComponent,
    DropDownComponent,
    ActionDropDownComponent,
    ProfileImgComponent,
    TableDropDownComponent,
    FoxButtonComponent,
    AddButtonComponent,
    EventGroupComponent,
    FoxInputComponent,
    EventTagComponent,
    SwitcherComponent,
    ConfigureButtonComponent,
    AddEventModalComponent
  ],
  exports: [
    CreationButtonComponent,
    UploadButtonComponent,
    DropDownSelectComponent,
    CommonModule,
    FormsModule,
    ExperienceNavigationComponent,
    MainNavigationComponent,
    EventNavigationComponent,
    EventComponent,
    AdminNavigationComponent,
    CheckboxComponent,
    DropDownComponent,
    ActionDropDownComponent,
    ProfileImgComponent,
    TableDropDownComponent,
    FoxButtonComponent,
    AddButtonComponent,
    EventGroupComponent,
    FoxInputComponent,
    EventTagComponent,
    SwitcherComponent,
    ConfigureButtonComponent,
    AddEventModalComponent
  ]
})

export class FeatureModule {
}
