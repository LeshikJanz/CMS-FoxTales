import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

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
   * @param {Router} router - Router
   */
  constructor(private auth: AuthService, private router: Router) {
  }

  /**
   * Restricts access
   *
   * @returns {boolean} - Is authenticated?
   */
  public canActivate() {
    if (this.auth.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
