import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ng2-validation';
import { IUser } from '../user.interface';
import { IUserRole } from '../user-role.interface';
import { IUserClient } from '../user-client.interface';
import { UserService } from '../user.service';

/**
 * User details component
 */
@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['user-edit.component.scss']
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
    email: null,
    roles: [],
    clientId: null
  };

  /**
   * User client
   *
   * @type {IUserClient}
   */
  public client: IUserClient;

  /**
   * Clients
   *
   * @type {IUserClient[]}
   */
  public clients: IUserClient[];

  /**
   * User roles
   *
   * @type {IUserRole[]}
   */
  public roles: IUserRole[];

  /**
   * Client Id
   *
   * @type {number}
   */
  public clientId: string;

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
      this.getUserClients();
    });
  }

  /**
   * Get user clients
   *
   * @returns {UserEditComponent} - Component
   */
  public getUserClients(): UserEditComponent {
    this.userService
      .getClients()
      .subscribe((clients: IUserClient[]) => {
        this.clients = clients;
      });

    return this;
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
   * Get client by id
   *
   * @param {string} id - Client id
   * @returns {void|Promise<boolean>}
   */
  public getClient(id: string): void|Promise<boolean> {
    this.userService
      .getClient(id)
      .subscribe((client: IUserClient) => {
        this.client = client;
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
          return this.router.navigate(['/admin/users']);
        }

        this.user = user;
        this.getUserRoles();
        this.getClient(user.clientId);
      });
  }

  /**
   * Update user
   *
   * @returns {void}
   */
  public updateUser(): void {
    // this.extractRoles();

    this.user.clientId = this.clientId;

    this.userService
      .updateUser(this.user)
      .subscribe(() => {
        this.toastrService.success('User has been removed successfully.');
        this.router.navigate(['/admin/users']);
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
   * Is form invalid
   *
   * @return {boolean}
   */
  public isFormInvalid(): boolean {
    if (this.clientId) {
      return false;
    }
    return true;
  }

  /**
   * Build user form
   *
   * @returns {void}
   */
  public buildUserForm(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        CustomValidators.email
      ]]
    });
  }
}
