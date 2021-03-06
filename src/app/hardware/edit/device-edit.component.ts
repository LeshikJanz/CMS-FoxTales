import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { IDeviceClient } from '../device-client.interface';
import { IDevice } from '../device.interface';
import { DeviceService } from '../device.service';

/**
 * Device details component
 */
@Component({
  selector: 'device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['device-edit.component.scss',
    '../../shared/styles/form-element.scss']
})
export class DeviceEditComponent implements OnInit {
  /**
   * Device form
   *
   * @type {FormGroup}
   */
  public deviceForm: FormGroup;

  /**
   * Device
   *
   * @type {IDevice}
   */
  public device: IDevice = {
    hubId: null,
    purchaseDate: null,
    productId: null,
    clientId: null,
    locationId: null,
    name: null
  };

  /**
   * Products
   *
   * @type {any[]}
   */
  public products: any[];

  /**
   * Locations
   *
   * @type {any[]}
   */
  public locations: any[];

  /**
   * Clients
   *
   * @type {any[]}
   */
  public clients: any[];
  public purchaseMomentDate: string;
  public selectedProduct: any;
  public selectedLocation: any;
  public selectedClient: any;

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {ActivatedRoute} route - Activated route
   * @param {FormBuilder} formBuilder - Form builder
   * @param {ToastrService} toastrService - Toastr service
   * @param {DeviceService} deviceService - Device service
   * @returns {void}
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private deviceService: DeviceService) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.buildDeviceForm();

    this.route.params.subscribe((params: any) => {
      const id = params['id'];
      this.getDevice(id);
    });
  }

  /**
   * Get products
   *
   * @returns {void}
   */
  public getProducts(): void {
    this.deviceService
      .getProducts()
      .subscribe((products: any[]) => {
        this.products = products;
        this.selectedProduct = _.find(products, (item) => item.id === this.device.productId)
      });
  }

  /**
   * Get locations
   *
   * @returns {void}
   */
  public getLocations(): void {
    this.deviceService
      .getLocations()
      .subscribe((locations: any[]) => {
        this.locations = locations;
        this.selectedLocation = _.find(locations, (item) => item.id === this.device.locationId);
      });
  }

  /**
   * Get clients
   *
   * @returns {void}
   */
  public getClients(): void {
    this.deviceService
      .getClients()
      .subscribe((clients: any) => {
        let noClient: any = {id: 'null', name: 'unassign'};
        clients.result.unshift(noClient);
        this.clients = clients.result;
        this.selectedClient = _.find(
            clients.result,
            (item: any) => item.id === this.device.clientId
          ) || noClient;
      });
  }

  /**
   * Get device by id
   *
   * @returns {void}
   */
  public getDevice(id: string): void {
    this.deviceService
      .getDevice(id)
      .subscribe((device: IDevice) => {
        if (!device) {
          return this.router.navigate(['/admin/devices']);
        }
        if (device.purchaseDate) {
          this.purchaseMomentDate = device.purchaseDate = moment(device.purchaseDate).format('MMM DD, YYYY');
        }
        this.device = device;

        this.buildDeviceForm();

        this.getProducts();
        this.getLocations();
        this.getClients();
      });
  }

  /**
   * Update device
   *
   * @returns {void}
   */
  public updateDevice(device: IDevice): void {
    device['purchaseDate'] = moment(this.purchaseMomentDate, 'MMM DD YYYY').format();
    device['clientId'] = device['clientId'] === 'null' ? null : device['clientId'];
    this.deviceService
      .updateDevice(device, this.device.id)
      .subscribe(() => {
        this.toastrService.success('Device has been updated successfully.');
        this.router.navigate(['/admin/devices']);
      });
  }

  /**
   * Build device form
   *
   * @returns {void}
   */
  public buildDeviceForm(): void {
    this.deviceForm = this.formBuilder.group({
      name: [this.device.name, [
        Validators.required
      ]],
      hubId: [this.device.hubId, [
        Validators.required
      ]],
      purchaseDate: [this.device.purchaseDate || ''],
      productId: [this.device.productId, [
        Validators.required
      ]],
      clientId: [this.device.clientId],
      locationId: [this.device.locationId || '']
    });
  }
}
