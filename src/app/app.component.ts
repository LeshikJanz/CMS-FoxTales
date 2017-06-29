import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Authentication } from 'adal-ts';
import { AuthService, PermissionService } from './shared/core';
import { RouteData } from './shared/core/event-management/route-data.service';

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
  public version: string = '2.2.14';

  /**
   * Route name
   *
   * @type {string}
   */
  public routeName: any = '';

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {ActivatedRoute} activatedRoute - Activated route
   * @param {AuthService} auth - Auth service
   * @param {PermissionService} permissions - Permissions service
   * @param {RouteData} routeData - Route data service
   * @returns {void}
   */
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private auth: AuthService,
              private permissions: PermissionService,
              private routeData: RouteData) {

    setTimeout(() => {
      this.redirect();
    }, 1000);
  }

  /**
   * Process the redirect after login
   *
   * @returns {void}
   */
  public ngOnInit() {
    Authentication.getAadRedirectProcessor().process();

    this.permissions.setAccessData();
    this.checkAcl();
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

  /**
   * Is permissions valid?
   *
   * @returns {boolean}
   */
  public validPermissions(): boolean {
    return this.permissions.validPermissions();
  }

  /**
   * Check user ACL
   *
   * @returns {void}
   */
  public checkAcl(): void {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }

        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        const acl = event['acl'];

        if (!acl) {
          return;
        }

        if (!this.permissions.isAllowed(acl)) {
          this.router.navigate(['/forbidden']);
        }
      });
  }

  /**
   * Redirect not CMS users to forbidden page
   *
   * @returns {void}
   */
  public redirect(): void {
    if (window.location.href.match(/access_denied/)
      || (this.loggedIn() && !this.permissions.validPermissions())) {
      this.router.navigate(['/forbidden']);
      return;
    }

    if (!this.loggedIn()) {
      this.router.navigate(['/auth']);
    }
  }
}
