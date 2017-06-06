import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Default pipe
 */
@Pipe({
  name: 'myDefault'
})
export class DefaultPipe implements PipeTransform {
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
  public transform(value: any, options: any) {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<div title="{{value}}">{{value}}</div>`
    );
  }
}
