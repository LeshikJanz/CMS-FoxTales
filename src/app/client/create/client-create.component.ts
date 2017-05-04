import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { IClient } from '../client.interface';
import { ClientService } from '../client.service';

@Component({
  selector: 'client-create',
  templateUrl: './client-create.component.html'
})
export class ClientCreateComponent implements OnInit {
  /**
   * Client form
   *
   * @type {FormGroup}
   */
  public clientForm: FormGroup;

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {FormBuilder} formBuilder
   * @param {ClientService} clientService - Client service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clientService: ClientService
  ) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.buildClientForm();
  }

  /**
   * Add new client
   *
   * @param {IClient} client - Client
   * @returns {void}
   */
  public addClient(client: IClient): void {
    this.clientService
      .addClient(client)
      .subscribe(() => this.router.navigate(['/clients']));
  }

  /**
   * Build client form
   *
   * @returns {void}
   */
  public buildClientForm(): void {
    this.clientForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        CustomValidators.email
      ]],
      address: ['', [
        Validators.required
      ]],
      phone: ['', [
        Validators.required
      ]],
      city: ['', [
        Validators.required
      ]],
      state: ['', [
        Validators.required
      ]],
      freshBookUrl: ['', [
        Validators.required
      ]]
    });
  }
}
