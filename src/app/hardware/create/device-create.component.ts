import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDevice } from '../device.interface';
import { DeviceService } from '../device.service';

@Component({
  selector: 'device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.scss']
})
export class DeviceCreateComponent implements OnInit {
  /**
   * Device form
   *
   * @type {FormGroup}
   */
  public deviceForm: FormGroup;

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

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {FormBuilder} formBuilder
   * @param {DeviceService} deviceService - Device service
   * @returns {void}
   */
  constructor(private router: Router,
              private formBuilder: FormBuilder,
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
    this.getProducts();
    this.getLocations();
    this.getClients();
  }

  /**
   * Get products
   *
   * @returns {void}
   */
  public getProducts(): void {
    this.deviceService
      .getProducts()
      .subscribe((products: any[]) => this.products = products);
  }

  /**
   * Get locations
   *
   * @returns {void}
   */
  public getLocations(): void {
    this.deviceService
      .getLocations()
      .subscribe((locations: any[]) => this.locations = locations);
  }

  /**
   * Get clients
   *
   * @returns {void}
   */
  public getClients(): void {
    this.deviceService
      .getClients()
      .subscribe((clients: any) => this.clients = clients.result);
  }

  /**
   * Add new device
   *
   * @param {IDevice} device - Device
   * @returns {void}
   */
  public addDevice(device: IDevice): void {

    this.deviceService
      .addDevice(device)
      .subscribe(() => this.router.navigate(['/admin/devices']));
  }

  /**
   * Build device form
   *
   * @returns {void}
   */
  public buildDeviceForm(): void {
    this.deviceForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      productId: ['', [
        Validators.required
      ]],
      clientId: [''],
      locationId: ['']
    });
  }
}
