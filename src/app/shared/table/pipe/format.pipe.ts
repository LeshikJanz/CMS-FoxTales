import { Pipe, PipeTransform } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { DefaultPipe } from "./default.pipe";
import { DomSanitizer } from "@angular/platform-browser";

/**
 * Format cell pipe
 *
 * Usage:
 * Just provide needed pipe in `SharedModule` and `FormatPipe` constructor.
 * Then apply it in component:
 *
 * ```
 * public cols: ICol[] = [
 *  { id: 'name',    title: 'Name',    format: 'uppercase' },  // <---
 *  { id: 'address', title: 'Address', format: 'default' },
 *  ...
 * ];
 * ```
 */
@Pipe({
  name: 'myFormatCell'
})
export class FormatPipe implements PipeTransform {
  /**
   * Constructor
   *
   * @param sanitizer
   * @param myImage
   * @param defaultPipe
   */
  constructor(private sanitizer: DomSanitizer,
              private myImage: ImagePipe,
              private defaultPipe: DefaultPipe
) {
}

/**
 * Angular invokes the `transform` method with the value of a binding
 * as the first argument, and any parameters as the second argument in list form.
 *
 * @param {any} value - Cell value
 * @param {string} format - Pipe name
 * @param {string[]} formatOptions - Pipe options
 * @returns {any} - Formatted value
 */
public transform(value:any, format:string, formatOptions ? : string[])
{
  if (undefined === value || null === value) {
    return '-';
  }

  if (this[format]) {
    return this[format].transform(value, ...formatOptions);
  }

  // return value;
  return this.sanitizer.bypassSecurityTrustHtml(
    `<div title="${value}" style="overflow: hidden;
        text-overflow: ellipsis; white-space: nowrap;">${value}</div>`
  );
}
}
