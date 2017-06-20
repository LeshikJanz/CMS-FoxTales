import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { IDevice, IDeviceFilter, IDeviceList } from './device.interface';
import { Device } from './device';
import { ILog } from './log.interface';

/**
 * User service
 *
 * See: http://client2.dev.getfoxtales.com/swagger/#!/Users
 */
@Injectable()
export class DeviceService {
  /**
   * Constructor
   *
   * @param {Http} http
   * @returns {void}
   */
  constructor(private http: Http) {
  }

  /**
   * Get devices
   *
   * See: http://dev.getfoxtales.com/swagger/#!/Devices/ApiDevicesGet
   *
   * @param {IDeviceFilter} filter - Filter
   * @returns {Observable<IDeviceList>} - Devices
   */
  public getDevices(filter: IDeviceFilter): Observable<IDeviceList> {
    return this.http.post(`${process.env.API_URL}/Devices/GetDeviceList`, filter)
      .map((response: Response) => <IDeviceList> response.json());
  }

  /**
   * Get device by id
   *
   * See: http://dev.getfoxtales.com/swagger/#!/Devices/ApiDevicesByIdGet
   *
   * @param {string} id - Device id
   * @returns {Observable<Device>} - Device
   */
  public getDevice(id: string): Observable<Device> {
    return this.http.get(`${process.env.API_URL}/Devices/${id}`)
      .map((response: Response) => <Device> response.json()[0]);
  }

  /**
   * Get device details
   *
   * See: http://dev.getfoxtales.com/swagger/#!/Devices/ApiDevicesByIdGet
   *
   * @param {IDeviceFilter} filter - Filter
   * @returns {Observable<IDeviceList>} - Logs
   */
  public getDeviceDetails(filter: IDeviceFilter): Observable<IDeviceList> {
    return this.http.post(`${process.env.API_URL}/Devices/Details`, filter)
      .map((response: Response) => <IDeviceList> response.json());
  }

  /**
   * Get log by id
   *
   * See: http://dev.getfoxtales.com/swagger/#!/Devices/ApiDevicesByIdGet
   *
   * @param {string} id - Log id
   * @returns {Observable<Log>} - Log
   */
  public getLog(id: string): Observable<ILog> {
    return this.http.get(`${process.env.API_URL}/Devices/${id}/Log`)
      .map((response: Response) => <ILog> response.json());
  }

  /**
   * Add device
   *
   * See: http://dev.getfoxtales.com/swagger/#!/Devices/ApiDevicesPost
   *
   * @param {Device} device - Device
   * @returns {Observable<Device>} - Device
   */
  public addDevice(device: IDevice): Observable<IDevice> {
    return this.http.post(`${process.env.API_URL}/Devices`, device)
      .map((response: Response) => <Device> response.json());
  }

  /**
   * Update device
   *
   * See: http://dev.getfoxtales.com/swagger/#!/Devices/ApiDevicesByIdPut
   *
   * @param {Device} device - Device
   * @returns {Observable<Device>} - Device
   */
  public updateDevice(device: IDevice, id: number): Observable<Device> {
    return this.http.put(`${process.env.API_URL}/Devices/${id}/update`, device)
      .map((response: Response) => <Device> response.json());
  }

  /**
   * Get products
   *
   * See: http://dev.getfoxtales.com/swagger/#!/Products/ApiProductsAssociatedListGet
   *
   * @returns {Observable<any>} - products
   */
  public getProducts(): Observable<any> {
    return this.http.get(`${process.env.API_URL}/Products/AssociatedList`)
      .map((response: Response) => response.json());
  }

  /**
   * Get locations
   *
   * See: http://dev.getfoxtales.com/swagger/#!/Locations/ApiLocationsAssociatedListGet
   *
   * @returns {Observable<any>} - locations
   */
  public getLocations(): Observable<any> {
    return this.http.get(`${process.env.API_URL}/Locations/AssociatedList`)
      .map((response: Response) => response.json());
  }

  /**
   * Get clients
   *
   * See: http://dev.getfoxtales.com/swagger/#!/Clients/ApiClientsLookupGet
   *
   * @returns {Observable<any>} - clients
   */
  public getClients(): Observable<any> {
    return this.http.get(`${process.env.API_URL}/Clients/Lookup`)
      .map((response: Response) => response.json());
  }
}
