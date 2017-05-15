import { Component } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * Auth component
 */
@Component({
  selector: 'auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  /**
   * Constructor
   *
   * @param {AuthService} auth - Auth service
   * @returns {void}
   */
  constructor(private auth: AuthService) {
  }

  /**
   * Log in
   *
   * @returns {void}
   */
  public login(): void {
    const context = this.auth.getContext();
    context.login();
  }

  /**
   * Log out
   *
   * @returns {void}
   */
  public logout(): void {
    const context = this.auth.getContext();
    context.logout();
  }
}
