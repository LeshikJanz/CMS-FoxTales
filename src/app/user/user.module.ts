import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import USER_ROUTES from './user.routes';

import { UserService } from './user.service';
import { UserListComponent } from './list';
import { UserCreateComponent } from './create';
import { UserEditComponent } from './edit';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    USER_ROUTES
  ],
  providers: [
    UserService
  ],
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserEditComponent
  ]
})
export default class UserModule {
}
