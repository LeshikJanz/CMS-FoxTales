import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Navigation service
 */
@Injectable()
export class NavigationService {

  constructor(private router: Router) {}

  /**
   * Global function to figure out is current url active
   *
   * @param {string[]} urls - array of urls
   */
  public isActive(urls: string[]): boolean {
    let state: boolean = false;

    urls.forEach((i: any) => {
      if (this.router.isActive(this.router.createUrlTree([i]), false)) {
        state = true;
      }
    });

    return state;
  }
}
