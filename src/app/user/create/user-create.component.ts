import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { IUser } from '../user.interface';
import { IUserRole } from '../user-role.interface';
import { UserService } from '../user.service';

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
      .getUserRoles();
  }

  /**
   * Get user roles
   *
   * @returns {void}
   */
  public getUserRoles(): void {
    this.userService
      .getUserRoles()
      .subscribe((roles: IUserRole[]) => this.roles = roles);
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
      .addUser({ ...user, ...this.userDetails })
      .subscribe(() => this.router.navigate(['/users']));
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
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        CustomValidators.email
      ]],
      phone: ['', [
        Validators.required
      ]],
      location: ['', [
        Validators.required
      ]],
      clientId: ['', [
        Validators.required
      ]],
      selectedClientAccess: ['', [
        Validators.required
      ]]
    });

    return this;
  }
}
