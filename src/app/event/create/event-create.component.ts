import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'event-create',
  templateUrl: './event-create.component.html',
  styleUrls: [ './event-create.component.scss' ]
})
export class EventCreateComponent implements OnInit {
  /**
   * Event form
   *
   * @type {FormGroup}
   */
  public eventForm: FormGroup;

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
    private formBuilder: FormBuilder
  ) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.buildEventForm();
  }

  /**
   * Build user form
   *
   * @returns {UserCreateComponent} - Component
   */
  public buildEventForm(): EventCreateComponent {
    this.eventForm = this.formBuilder.group({
      eventName: ['', [
        Validators.required
      ]],
      location: ['', [
        Validators.required
      ]]
    });

    return this;
  }
}
