import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from 'adal-ts';
import { AuthService, PermissionService } from './shared/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
   * App version
   *
   * @type {string}
   */
  public version: string = '2.2.1';

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {AuthService} auth - Auth service
   * @param {PermissionService} permissions - Permissions service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private auth: AuthService,
    private permissions: PermissionService) {
    // Redirect not CMS users to forbidden page
    // TODO: research better solution
    if (window.location.href.match(/access_denied/)) {
      this.router.navigate(['/forbidden']);
      return;
    }

    if (!this.loggedIn()) {
      this.router.navigate(['/auth']);
    }
  }

  /**
   * Process the redirect after login
   *
   * @returns {void}
   */
  public ngOnInit() {
    Authentication.getAadRedirectProcessor().process();
  }

  /**
   * Is logged in?
   *
   * @returns {boolean} - Is logged in
   */
  public loggedIn(): boolean {
    return this.auth.loggedIn();
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
