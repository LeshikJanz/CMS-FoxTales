import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Default pipe
 */
@Pipe({
  name: 'myFirstName'
})
export class FirstNamePipe implements PipeTransform {
  /**
   * Constructor
   *
   * @param {DomSanitizer} sanitizer - Sanitizer
   * @returns {void}
   */
  constructor(private sanitizer: DomSanitizer) {
  }

  /**
   * Angular invokes the `transform` method with the value of a binding
   * as the first argument, and any parameters as the second argument in list form.
   *
   * @param {any} value - Cell value
   * @returns {any} - Formatted value
   */
  public transform(value: any) {
    const date = new Date();
    const logo = value.logo ? `${value.logo}?_=${date.getTime()}`
      : '../../../../assets/img/default-user-icon.png';
    const name = value.name ? value.name : value.firstName ? value.firstName : '-';
    return this.sanitizer.bypassSecurityTrustHtml(
      `<div class="first-name">
          <img src="${logo}">
          <div title="${name}">${name}
          </div>
        </div>`
    );
  }
}
