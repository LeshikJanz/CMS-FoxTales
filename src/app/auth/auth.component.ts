import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/core';

/**
 * Auth component
 */
@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {AuthService} auth - Auth service
   * @returns {void}
   */
  constructor(private router: Router, private auth: AuthService) {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
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
   * Is logged in?
   *
   * @returns {boolean} - Is logged in
   */
  public loggedIn(): boolean {
    return this.auth.loggedIn();
  }
}
