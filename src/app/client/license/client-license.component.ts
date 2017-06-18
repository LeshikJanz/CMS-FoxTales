import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  IClientLicense,
  IClientLicenseType,
  IClientLicenseTier,
  IClientLicenseBilling,
  IClientLicenseHardware
} from '../client-license.interface';
import { ClientService } from '../client.service';

@Component({
  selector: 'client-license',
  templateUrl: './client-license.component.html',
  styleUrls: [ '../../shared/styles/form-element.scss' ]
})
export class ClientLicenseComponent implements OnInit {
  /**
   * License form
   *
   * @type {FormGroup}
   */
  public licenseForm: FormGroup;

  /**
   * Client license
   *
   * @type {any}
   */
  public license: IClientLicense;

  /**
   * License types
   *
   * @type {IClientLicenseType}
   */
  public licenseTypes: IClientLicenseType[];

  /**
   * License tiers
   *
   * @type {IClientLicenseTier}
   */
  public licenseTiers: IClientLicenseTier[];

  /**
   * License billing types
   *
   * @type {IClientLicenseBilling}
   */
  public licenseBilling: IClientLicenseBilling[];

  /**
   * License hardware types
   *
   * @type {IClientLicenseHardware}
   */
  public licenseHardware: IClientLicenseHardware[];

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {ActivatedRoute} route - Activated route
   * @param {ToastrService} toastrService - Toastr service
   * @param {FormBuilder} formBuilder
   * @param {ClientService} clientService - Client service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
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
    this.route.params.subscribe((params: any) => {
      this.getLicense(params['id']);
    });

    this
      .getLicenseTypes()
      .getLicenseTiers()
      .getLicenseBilling()
      .getLicenseHardware()
      .buildLicenseForm();
  }

  /**
   * Get license
   *
   * @param {string} clientId - Client id
   * @returns {ClientLicenseComponent} - Component
   */
  public getLicense(clientId: string): ClientLicenseComponent {
    this.clientService
      .getClientLicense(clientId)
      .subscribe((license: IClientLicense) => this.license = license);

    return this;
  }

  /**
   * Get license types
   *
   * @returns {ClientLicenseComponent} - Component
   */
  public getLicenseTypes(): ClientLicenseComponent {
    this.clientService
      .getClientLicenseTypes()
      .subscribe((types: IClientLicenseType[]) => this.licenseTypes = types);

    return this;
  }

  /**
   * Get license tiers
   *
   * @returns {ClientLicenseComponent} - Component
   */
  public getLicenseTiers(): ClientLicenseComponent {
    this.clientService
      .getClientLicenseTiers()
      .subscribe((tiers: IClientLicenseTier[]) => this.licenseTiers = tiers);

    return this;
  }

  /**
   * Get license billing types
   *
   * @returns {ClientLicenseComponent} - Component
   */
  public getLicenseBilling(): ClientLicenseComponent {
    this.clientService
      .getClientLicenseBilling()
      .subscribe((billing: IClientLicenseBilling[]) => this.licenseBilling = billing);

    return this;
  }

  /**
   * Get license hardware types
   *
   * @returns {ClientLicenseComponent} - Component
   */
  public getLicenseHardware(): ClientLicenseComponent {
    this.clientService
      .getClientLicenseHardware()
      .subscribe((hardware: IClientLicenseHardware[]) => this.licenseHardware = hardware);

    return this;
  }

  /**
   * Build license form
   *
   * @returns {ClientLicenseComponent} - Component
   */
  public buildLicenseForm(): ClientLicenseComponent {
    this.licenseForm = this.formBuilder.group({
    });

    return this;
  }
}
