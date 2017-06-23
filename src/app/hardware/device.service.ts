import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/core/auth/auth.service';
import { Device } from './device';
import { IDevice, IDeviceFilter, IDeviceList } from './device.interface';
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
  constructor(private http: Http,
              private auth: AuthService) {
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
   * Get settings
   *
   * See: http://dev.getfoxtales.com/swagger/#!/Devices/ApiDevicesDeviceSettingsGet
   *
   * @returns {Observable<any>} - settings
   */
  public getSettings(): Observable<any> {
    return this.http.get(`${process.env.API_URL}/Devices/DeviceSettings`)
      .map((response: Response) => response.json());
  }

  /**
   * Update settings
   *
   * See: http://dev.getfoxtales.com/swagger/#!/Devices/ApiDevicesDeviceSettingsPut
   *
   * @param {settings} settings - settings
   * @returns {Observable<settings>} - settings
   */
  public updateSettings(settings: any): Observable<any> {
    return this.http.put(`${process.env.API_URL}/Devices/DeviceSettings?updateType=${settings.updateType}&logsPerDay=${settings.logsPerDay}`, settings)
      .map((response: Response) => response.json());
  }

  /**
   * Rename device
   *
   * See: http://dev.getfoxtales.com/swagger/#!/Devices/ApiDevicesByIdRenamePut
   *
   * @param {id} id - number
   * @param {name} name - string
   * @returns {Observable<any>} - any
   */
  public renameDevice(id: number, name: string): Observable<any> {
    return this.http.put(`${process.env.API_URL}/Devices/${id}/rename?name=${name}`, {})
      .map((response: Response) => response.json());
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

  public downloadDeviceSettings(id: number): Observable<any> {
    return this.http.get(`${process.env.API_URL}/Devices/${id}/DeviceConnectionSettings`)
      .map((response: Response) => response.json());
  }

  public restartDevice(id: any): Observable<any> {
    return this.http.put(`${process.env.API_URL}/Devices/${id}/restart`, {})
      .map((response: Response) => response.json());
  }

  public getUploadUrl(version: string): Observable<any> {
    return this.http.get(`${process.env.API_URL}/Devices/GetUploadSoftwareURL/${version}`)
      .map((response: Response) => response.json());
  }

  public uploadFileToBlob(url: string, file: any): Observable<any> {
    // let headers = new Headers();
    // headers.append('Authorization', `SharedKey ${this.auth.getContext().getToken()}`);
    // let options = new RequestOptions({headers: headers});
    return this.http.put(url, file)
      .map((response: Response) => response.json());
  }

  public setUploadUrl(data: any): Observable<any> {
    return this.http.post(`${process.env.API_URL}/Devices/SetUploadSoftwareURL`, data)
      .map((response: Response) => response.json());
  }
}
