import { Pipe, PipeTransform } from '@angular/core';

/**
 * Temperature pipe
 */
@Pipe({
  name: 'myTemperature'
})
export class TemperaturePipe implements PipeTransform {
  public transform(value: any) {
    return `${value.toFixed(1)}&deg; F`;
  }
}
