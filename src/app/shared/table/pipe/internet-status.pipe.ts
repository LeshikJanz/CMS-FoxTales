import { Pipe, PipeTransform } from '@angular/core';

/**
 * Boolean pipe
 */
@Pipe({
  name: 'myInternetStatus'
})
export class InternetStatusPipe implements PipeTransform {
  public transform(value: any) {
    let className: string;
    switch (value) {
      case 0:
        className = 'good';
        break;
      case 1:
        className = 'medium';
        break;
      case 2:
        className = 'bad';
        break;
      default:
        break;
    }
    return `<div class="circle ${className}"></div>`;
  }
}
