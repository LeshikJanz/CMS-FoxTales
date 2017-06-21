import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ng2-validation';
import * as moment from 'moment';
import {
  IClientLicense,
  IClientLicenseType,
  IClientLicenseTier,
  IClientLicenseBilling,
  IClientLicenseHardware
} from '../client-license.interface';
import { ClientService } from '../client.service';
import { IActionState } from "../client.interface";

@Component({
  selector: 'client-license',
  templateUrl: './client-license.component.html',
  styleUrls: [ '../../shared/styles/form-element.scss',
                'client-license.component.scss']
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
  public license: IClientLicense = {
    licenseIdNumber: null,
    softwareLicenseTypeId: null,
    tierId: null,
    billingTypeId: null,
    startDate: null,
    numberOfMonths: null,
    autoRenew: false,
    hardwareLicenseTypeId: null,
    serialNumber: null,
    billingContactName: null,
    billingContactEmail: null,
    billingContactPhone: null,
    billingContactAddress: null
  };

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
   * Client id
   *
   * @type {string}
   */
  public clientId: string;

  /**
   * Number of months
   *
   * @type {any[]}
   */
  public months: IActionState[] = [
    { id: 1, action: '1' },
    { id: 2, action: '2' },
    { id: 3, action: '3' },
    { id: 4, action: '4' },
    { id: 5, action: '5' },
    { id: 6, action: '6' },
    { id: 7, action: '7' },
    { id: 8, action: '8' },
    { id: 9, action: '9' },
    { id: 10, action: '10' },
    { id: 11, action: '11' },
    { id: 12, action: '12' }
  ];

  /**
   * License type
   *
   * @type {IClientLicenseType}
   */
  public activeLicenseType: IClientLicenseType = {
    id: null,
    name: null
  };

  /**
   * License tier
   *
   * @type {IClientLicenseTier}
   */
  public activeLicenseTier: IClientLicenseTier = {
    id: null,
    name: null
  };

  /**
   * License billing type
   *
   * @type {IClientLicenseBilling}
   */
  public activeLicenseBilling: IClientLicenseBilling = {
    id: null,
    name: null
  };

  /**
   * License hardware type
   *
   * @type {IClientLicenseHardware}
   */
  public activeLicenseHardware: IClientLicenseHardware = {
    id: null,
    name: null
  };

  /**
   * License months
   *
   * @type {IActionState}
   */
  public activeLicenseMonths: IActionState = {
    id: 1,
    action: null
  };

  /**
   * Start date
   *
   * @type {string}
   */
  public startDate: string;

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
      this.clientId = params['id'];
      this.getLicense(this.clientId);
    });

    this.buildLicenseForm();
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
      .subscribe((license: IClientLicense) => {
        if (license) {
          this.license = license;
          this.activeLicenseMonths.id = license.numberOfMonths;
          this.startDate = moment(license.startDate).format('MMMM D, YYYY');
        }

        this
          .getLicenseTypes()
          .getLicenseTiers()
          .getLicenseBilling()
          .getLicenseHardware();
      });

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
      .subscribe((types: IClientLicenseType[]) => {
        this.licenseTypes = types;
        this.activeLicenseType.id = this.license.softwareLicenseTypeId || types[0].id;
      });

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
      .subscribe((tiers: IClientLicenseTier[]) => {
        this.licenseTiers = tiers;
        this.activeLicenseTier.id = this.license.tierId || tiers[0].id;
      });

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
      .subscribe((billing: IClientLicenseBilling[]) => {
        this.licenseBilling = billing;
        this.activeLicenseBilling.id = this.license.billingTypeId || billing[0].id;
      });

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
      .subscribe((hardware: IClientLicenseHardware[]) => {
        this.licenseHardware = hardware;
        this.activeLicenseHardware.id = this.license.hardwareLicenseTypeId || hardware[0].id;
      });

    return this;
  }

  /**
   * Update license
   *
   * @returns {void}
   */
  public updateLicense(): void {
    this.license.startDate = moment(this.startDate).format('M/D/YYYY');
    this.license.clientID = this.clientId;

    this.clientService
      .updateClientLicense(this.license)
      .subscribe((response: any) => {
        this.toastrService.success('License has been updated.');
      });
  }

  /**
   * Build license form
   *
   * @returns {ClientLicenseComponent} - Component
   */
  public buildLicenseForm(): ClientLicenseComponent {
    this.licenseForm = this.formBuilder.group({
      licenseIdNumber: ['', [
        Validators.required
      ]],
      serialNumber: ['', [
        Validators.required
      ]],
      billingContactName: [''],
      billingContactEmail: ['', [
        CustomValidators.email
      ]],
      billingContactPhone: [''],
      billingContactAddress: ['']
    });

    return this;
  }
}
