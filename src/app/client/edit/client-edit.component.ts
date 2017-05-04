import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ng2-validation';
import { IClient } from '../client.interface';
import { ClientService } from '../client.service';

/**
 * Client details component
 */
@Component({
  selector: 'client-edit',
  templateUrl: './client-edit.component.html'
})
export class ClientEditComponent implements OnInit {
  /**
   * Client form
   *
   * @type {FormGroup}
   */
  public clientForm: FormGroup;

  /**
   * Client
   *
   * @type {IClient}
   */
  public client: IClient;

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {ActivatedRoute} route - Activated route
   * @param {FormBuilder} formBuilder - Form builder
   * @param {ToastrService} toastrService - Toastr service
   * @param {ClientService} clientService - Client service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
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

    this.route.params.subscribe((params: any) => {
      const id = params['id'];
      this.getClient(id);
    });
  }

  /**
   * Get client by id
   *
   * @returns {void}
   */
  public getClient(id: string): void {
    this.clientService
      .getClient(id)
      .subscribe((client: IClient) => {
        if (!client) {
          return this.router.navigate(['/clients']);
        }

        this.client = client;
      });
  }

  /**
   * Update client
   *
   * @param {IClient} client - Client
   * @returns {void}
   */
  public updateClient(client: IClient): void {
    this.clientService
      .updateClient(client)
      .subscribe(() => {
        this.toastrService.success('Client has been removed successfully.');
      });
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
