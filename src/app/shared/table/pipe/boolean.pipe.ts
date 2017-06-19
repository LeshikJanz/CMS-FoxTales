import { Pipe, PipeTransform } from '@angular/core';

/**
 * Boolean pipe
 */
@Pipe({
  name: 'myBoolean'
})
export class BooleanPipe implements PipeTransform {
  public transform(value: any) {
    return `<div class="dot ${value ? 'success' : 'error'}"></div>`;
  }
}
