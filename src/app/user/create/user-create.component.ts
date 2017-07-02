import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../user.interface';
import { IUserRole } from '../user-role.interface';
import { IUserClient } from '../user-client.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  /**
   * User form
   *
   * @type {FormGroup}
   */
  public userForm: FormGroup;

  /**
   * User roles
   *
   * @type {IUserRole[]}
   */
  public roles: IUserRole[];

  /**
   * Clients
   *
   * @type {IUserClient[]}
   */
  public clients: IUserClient[];

  /**
   * Additional user details
   *
   * @type {any}
   */
  public userDetails: any = {
    roles: [],
    clientId: null
  };

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {ToastrService} toastrService - Toastr service
   * @param {FormBuilder} formBuilder
   * @param {UserService} userService - User service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService) {
  }

  /**
   * Is form invalid
   *
   * @return {boolean}
   */
  public isFormInvalid(): boolean {
    if (this.userForm.valid && this.userDetails.clientId && this.userDetails.roles.length) {
      return false;
    }
    return true;
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this
      .buildUserForm()
      .getUserRoles()
      .getUserClients();
  }

  /**
   * Get user roles
   *
   * @returns {UserCreateComponent} - Component
   */
  public getUserRoles(): UserCreateComponent {
    this.userService
      .getUserRoles()
      .subscribe((roles: IUserRole[]) => this.roles = roles);

    return this;
  }

  /**
   * Get user clients
   *
   * @returns {UserCreateComponent} - Component
   */
  public getUserClients(): UserCreateComponent {
    this.userService
      .getClients()
      .subscribe((clients: IUserClient[]) => {
        this.clients = clients;
      });

    return this;
  }

  /**
   * Add new user
   *
   * @param {IUser} user - User
   * @returns {void}
   */
  public addUser(user: IUser): void {
    this.userService
      .addUser({ ...user, ...this.userDetails })
      .subscribe((response: any) => {
        if (response.success) {
          this.toastrService.success('User has been created successfully.');
          this.router.navigate(['/admin/users']);
        } else {
          this.toastrService.error(response.message);
        }
      });
  }

  /**
   * User role select
   *
   * @param {any} role - Role
   */
  public selectRole(role: any): void {
    this.userDetails.roles[0] = role.id;
  }

  /**
   * User role selected
   *
   * @param {any[]} roles - Roles
   */
  public rolesSelected(roles: any[]): void {
    this.userDetails.roles = roles.map((role: IUserRole) => {
      return role.id;
    });
  }

  /**
   * Build user form
   *
   * @returns {UserCreateComponent} - Component
   */
  public buildUserForm(): UserCreateComponent {
    this.userForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        CustomValidators.email
      ]]
    });

    return this;
  }
}
