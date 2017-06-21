import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { IPermissions, IPermissionMatrixItem } from './permissions.interface';

/**
 * Permission service
 */
@Injectable()
export class PermissionService {

  /**
   * Global clientId variable
   *
   * @type {number}
   */
  public static clientId: number = -1;

  /**
   * Global userId variable
   *
   * @type {number}
   */
  public static userId: number = -1;

  /**
   * Local storage access key
   *
   * @type {string}
   */
  public accessKey: string = 'access_data';

  /**
   * Constructor
   *
   * @param {Http} http - Http service
   * @returns {void}
   */
  constructor(private http: Http) {
  }

  /**
   * Get permissions
   *
   * @returns {Observable<IPermissions>} - Permissions
   */
  public getPermissions(): Observable<IPermissions> {
    return this.http.get(`${process.env.API_URL}/Account/Permissions`)
      .map((response: Response) => <IPermissions> response.json());
  }

  /**
   * Is permissions valid?
   *
   * @returns {boolean} - Is valid
   */
  public validPermissions(): boolean {
    const permissions = this.getAccessData();
    const isValid: boolean = -1 === [ permissions.clientId, permissions.userId ].indexOf(-1);

    PermissionService.clientId = permissions.clientId;
    PermissionService.userId = permissions.userId;

    return isValid;
  }

  /**
   * Store access data
   *
   * @returns {void}
   */
  public setAccessData(): void {
    this
      .getPermissions()
      .subscribe((accessData: IPermissions) => {
        localStorage.setItem(this.accessKey, JSON.stringify(accessData));
      });
  }

  /**
   * Get access data
   *
   * @returns {IPermissions} - Permissions
   */
  public getAccessData(): IPermissions {
    return JSON.parse(localStorage.getItem(this.accessKey));
  }

  /**
   * Is operation allowed?
   *
   * @param {string} operationName - Operation
   */
  public isAllowed(operationName: string): boolean {
    const accessData: IPermissions = this.getAccessData();
    const permissionMatrix: IPermissionMatrixItem[] = accessData.permissionMatrix;

    const operations = permissionMatrix.filter((operation: IPermissionMatrixItem) => {
      return operation.operationName.trim() === operationName;
    });

    return !!operations.length;
  }
}
