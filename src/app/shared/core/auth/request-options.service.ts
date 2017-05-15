import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { AuthService } from './auth.service';

/**
 * Creates a request options object to be optionally provided when
 * instantiating a `Request`.
 * See: https://angular.io/docs/ts/latest/api/http/index/BaseRequestOptions-class.html
 */
@Injectable()
export class AuthRequestOptions extends BaseRequestOptions {
  /**
   * Constructor
   *
   * @param {AuthService} auth - Auth service
   * @returns {void}
   */
  constructor(private auth: AuthService) {
    super();
  }

  /**
   * Creates a copy of the `RequestOptions` instance, using the optional
   * input as values to override existing values.
   *
   * Adds auth header to `RequestOptions`
   *
   * @param {RequestOptionsArgs} options
   * @returns {RequestOptions}
   */
  public merge(options?: RequestOptionsArgs): RequestOptions {
    const token = this.auth.getContext().getToken();

    if (token) {
      if (null === options.headers) {
        options.headers = new Headers();
      }

      options.headers.append('Authorization', token);
    }

    return super.merge(options);
  }
}
