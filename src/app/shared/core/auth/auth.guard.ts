import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PermissionService } from './permission.service';

/**
 * Used to prevent unauthenticated users from accessing restricted routes
 *
 * See: https://angular.io/docs/ts/latest/guide/router.html
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Constructor
   *
   * @param {AuthService} auth - Auth service
   * @param {PermissionService} permission - Permission service
   * @param {Router} router - Router
   * @returns {void}
   */
  constructor(
    private auth: AuthService,
    private permission: PermissionService,
    private router: Router) {
  }

  /**
   * Restricts access
   *
   * @returns {boolean} - Is authenticated?
   */
  public canActivate(): Observable<boolean>|Promise<boolean>|boolean {
    if (this.auth.loggedIn()) {
      return this.permission.validPermissions();
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
