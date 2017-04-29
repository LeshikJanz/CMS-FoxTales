import { Injectable, Injector } from '@angular/core';
import {
  Request,
  XHRBackend,
  RequestOptions,
  Response,
  Http,
  RequestOptionsArgs
} from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/**
 * Core HTTP service
 *
 * See: https://angular.io/docs/ts/latest/api/http/index/Http-class.html
 */
@Injectable()
export class HttpService extends Http {
  /**
   * Constructor
   *
   * @param {XHRBackend} backend - Create XHRConnection instances
   * @param {RequestOptions} defaultOptions - Request options object
   * @param {Injector} injector - Injector interface
   * @returns {void}
   */
  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private injector: Injector) {
    super(backend, defaultOptions);

  }

  /**
   * Performs any type of http request
   *
   * @param {string | Request} url - url or a {Request} instance
   * @param {RequestOptionsArgs} options - will be merged with the values
   *                                       of {BaseRequestOptions} before performing the request
   * @returns {Observable<Response>} - Response
   */
  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const toastr = this.injector.get(ToastrService);

    return super.request(url, options)
      .catch((error: Response) => {
        toastr.error('Error', error.json());
        return Observable.throw(error);
      });
  }
}
