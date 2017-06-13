import { Component } from '@angular/core';
import { AuthService } from '../shared/core';

/**
 * Forbidden page component
 */
@Component({
  selector: 'forbidden',
  templateUrl: './forbidden.component.html'
})
export class ForbiddenComponent {
  /**
   * Constructor
   *
   * @param {AuthService} auth - Auth service
   * @returns {void}
   */
  constructor(private auth: AuthService) {
  }

  /**
   * Is logged in?
   *
   * @returns {boolean} - Is logged in
   */
  public loggedIn(): boolean {
    return null !== this.auth.getContext().getUser();
  }

  /**
   * Log out
   *
   * @returns {void}
   */
  public logout(): void {
    console.log('aaa');
    const context = this.auth.getContext();
    context.logout();
  }
}
