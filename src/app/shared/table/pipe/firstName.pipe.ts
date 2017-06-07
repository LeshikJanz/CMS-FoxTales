import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Default pipe
 */
@Pipe({
  name: 'firstName'
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
    return this.sanitizer.bypassSecurityTrustHtml(
      `<div class="first-name">
          <img src="${value.logo}?_=${date.getTime()}"
           onError="this.src='https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png'">
          <div title="${value.name}">${value.name}
          </div>
        </div>`
    );
  }
}
