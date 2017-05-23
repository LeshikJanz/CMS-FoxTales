import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Image pipe
 */
@Pipe({
  name: 'myImage'
})
export class ImagePipe implements PipeTransform {
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
    return this.sanitizer.bypassSecurityTrustHtml(`<img src="${value}" style="max-height: 50px;">`);
  }
}
