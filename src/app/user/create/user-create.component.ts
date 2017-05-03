import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { IUser } from '../user.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit {
  /**
   * User form
   *
   * @type {FormGroup}
   */
  public userForm: FormGroup;

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
    this.buildUserForm();
  }

  /**
   * Add new user
   *
   * @param {IUser} user - User
   * @returns {void}
   */
  public addUser(user: IUser): void {
    this.userService
      .addUser(user)
      .subscribe(() => this.router.navigate(['/users']));
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
      clientId: ['', [
        Validators.required
      ]],
      roles: ['', [
        Validators.required
      ]]
    });
  }
}
