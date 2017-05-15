import { Injectable } from '@angular/core';
import { Authentication, AuthenticationContext, AdalConfig } from 'adal-ts';

/**
 * Auth service
 */
@Injectable()
export class AuthService {
  /**
   * Create auth config
   *
   * @returns {AdalConfig} - Auth config
   */
  public createConfig(): AdalConfig {
    return {
      tenant: process.env.AD_TENANT,
      clientId: process.env.AD_CLIENT,
      postLogoutRedirectUrl: window.location.origin + '/',
      redirectUri: window.location.origin + '/'
    };
  }

  /**
   * Get auth context
   *
   * @returns {AuthenticationContext} - Auth context
   */
  public getContext(): AuthenticationContext {
    return Authentication.getContext(this.createConfig());
  }
}
