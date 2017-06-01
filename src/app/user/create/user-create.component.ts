import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { IUser } from '../user.interface';
import { IUserRole } from '../user-role.interface';
import { IUserClient } from '../user-client.interface';
import { UserService } from '../user.service';
import { IClient } from "../../client/client.interface";
import { INgSelect } from "../../app.interface";

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
  styleUrls: [ './user-create.component.scss' ]
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
   * Value
   *
   * @type {INgSelect}
   */
  private value: INgSelect;

  /**
   * Items
   *
   * @type {string[]}
   */
  public items: INgSelect[];

  /**
   * Additional user details
   *
   * @type {any}
   */
  public userDetails: any = {
    roles: []
  };

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {FormBuilder} formBuilder
   * @param {UserService} userService - User service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
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
          this.items = this.clients.map((c: any) => ({
            id: c.id,
            text: c.name
          }));
      });

    return this;
  }

  /**
   * Select client
   *
   * @returns {void}
   */
  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }

  /**
   * Refresh value
   *
   * @returns {void}
   */
  public refreshValue(value:any):void {
    this.value = value;
  }

  /**
   * Add new user
   *
   * @param {IUser} user - User
   * @returns {void}
   */
  public addUser(user: IUser): void {
    this.extractRoles();

    this.userService
      .addUser(user)
      .subscribe(() => this.router.navigate(['/admin/users']));
  }

  /**
   * Extract selected roles
   *
   * @returns {void}
   */
  public extractRoles(): void {
    this.userDetails.roles = this.roles
      .filter((role: IUserRole) => role.checked)
      .map((role: IUserRole) => role.id);
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
      ]],
      clientId: ['', [
        Validators.required
      ]]
    });

    return this;
  }
}
