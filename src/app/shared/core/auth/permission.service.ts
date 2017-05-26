import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { IPermissions } from './permissions.interface';

/**
 * Permission service
 */
@Injectable()
export class PermissionService {
  /**
   * Constructor
   *
   * @param {Http} http - Http service
   * @param {Router} router - Router
   * @param {AuthService} auth - Auth service
   * @returns {void}
   */
  constructor(
    private http: Http,
    private router: Router,
    private auth: AuthService) {
  }

  static clientId: number = -1;

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
   * @returns {Observable<boolean>} - Is valid
   */
  public validPermissions(): Observable<boolean> {
    return this.getPermissions()
      .map((permissions: IPermissions) => {
        const isValid: boolean = -1 === [ permissions.clientId, permissions.userId ].indexOf(-1);
        PermissionService.clientId = permissions.clientId;

        if (!isValid) {
          this.router.navigate(['/forbidden']);
        }

        return isValid;
      });
  }
}
