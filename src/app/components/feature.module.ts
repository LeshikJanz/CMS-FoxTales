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

import {
  ExperienceBuilderNavigationComponent
}
  from './navigations/experience-builder-navigation/experience-builder-navigation.component';
 
//UI components from ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

import { ColorPickerModule } from 'ngx-color-picker';
import { TimepickerModule } from 'ngx-bootstrap';

import { EventGroupComponent } from './eventGroup/event-group.component';
import { FoxInputComponent } from './input/fox-input.component';
import { EventTagComponent } from './eventTag/event-tag.component';
import { SwitcherComponent } from './toggles/switcher/switcher.component';
import { ConfigureButtonComponent } from './buttons/configure-button/configure-button.component';
import { TagInputModule } from 'ng2-tag-input';
import { ScrollComponent } from './scroll/scroll.component';
import { GroupDropDownComponent } from './dropdowns/group-dropdown/group-dropdown.component';
import {
  EventsToCurGroupModalComponent
}
  from './modals/events-to-cur-group-modal/events-to-cur-group-modal.component';
import {
  EventToGroupModalComponent
}
  from './modals/event-to-group-modal/event-to-group-modal.component';
  import { DatepickerModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(FEATURE_ROUTES),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ColorPickerModule,
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    TagInputModule,
    DatepickerModule.forRoot()
  ],
  providers: [],
  declarations: [
    CreationButtonComponent,
    UploadButtonComponent,
    DropDownSelectComponent,
    ExperienceNavigationComponent,
    ExperienceBuilderNavigationComponent,
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
    EventsToCurGroupModalComponent,
    EventToGroupModalComponent,
    ScrollComponent,
    GroupDropDownComponent
  ],
  exports: [
    CreationButtonComponent,
    UploadButtonComponent,
    DropDownSelectComponent,
    CommonModule,
    FormsModule,
    ExperienceNavigationComponent,
    ExperienceBuilderNavigationComponent,
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
    EventsToCurGroupModalComponent,
    EventToGroupModalComponent,
    ScrollComponent,
    GroupDropDownComponent
  ]
})

export class FeatureModule {
}
