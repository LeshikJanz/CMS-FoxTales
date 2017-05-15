import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Authentication } from 'adal-ts';
import { AuthService } from './shared/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  /**
   * Constructor
   *
   * @param {AuthService} auth - Auth service
   * @returns {void}
   */
  constructor(private auth: AuthService) {
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
    return null !== this.auth.getContext().getUser();
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
