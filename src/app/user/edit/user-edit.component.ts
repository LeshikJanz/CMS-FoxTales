import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ng2-validation';
import { IUser } from '../user.interface';
import { IUserRole } from '../user-role.interface';
import { UserService } from '../user.service';

/**
 * User details component
 */
@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  /**
   * User form
   *
   * @type {FormGroup}
   */
  public userForm: FormGroup;

  /**
   * User
   *
   * @type {IUser}
   */
  public user: IUser = {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    location: null,
    roles: [],
    selectedClientAccess: null
  };

  /**
   * User roles
   *
   * @type {IUserRole[]}
   */
  public roles: IUserRole[];

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {ActivatedRoute} route - Activated route
   * @param {FormBuilder} formBuilder - Form builder
   * @param {ToastrService} toastrService - Toastr service
   * @param {UserService} userService - User service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
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
    this.buildUserForm();

    this.route.params.subscribe((params: any) => {
      const id = params['id'];
      this.getUser(id);
    });
  }

  /**
   * Get user roles
   *
   * @returns {void}
   */
  public getUserRoles(): void {
    this.userService
      .getUserRoles()
      .subscribe((roles: IUserRole[]) => {
        // Check selected roles
        if (this.user.roles) {
          roles.forEach((role: IUserRole) => {
            role.checked = -1 !== this.user.roles.indexOf(role);
          });
        }

        this.roles = roles;
    });
  }

  /**
   * Get user by id
   *
   * @returns {void}
   */
  public getUser(id: string): void {
    this.userService
      .getUser(id)
      .subscribe((user: IUser) => {
        if (!user) {
          return this.router.navigate(['/users']);
        }

        this.user = user;
        this.getUserRoles();
      });
  }

  /**
   * Update user
   *
   * @returns {void}
   */
  public updateUser(): void {
    this.extractRoles();

    this.userService
      .updateUser(this.user)
      .subscribe(() => {
        this.toastrService.success('User has been removed successfully.');
      });
  }

  /**
   * Extract selected roles
   *
   * @returns {void}
   */
  public extractRoles(): void {
    this.user.roles = this.roles
      .filter((role: IUserRole) => role.checked)
      .map((role: IUserRole) => role);
  }

  /**
   * Build user form
   *
   * @returns {void}
   */
  public buildUserForm(): void {
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
      selectedClientAccess: ['', [
        Validators.required
      ]]
    });
  }
}
