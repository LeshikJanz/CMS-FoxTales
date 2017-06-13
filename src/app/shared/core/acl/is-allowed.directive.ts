import { Directive, ElementRef, Input } from '@angular/core';
import { PermissionService } from '../auth/permission.service';

/**
 * Hide element if operation is not allowed
 */
@Directive({
  selector: '[isAllowed]'
})
export class IsAllowedDirective {
  /**
   * Operation name
   *
   * @type {string}
   */
  @Input() operation: string;

  /**
   * Constructor
   *
   * @param {ElementRef} el - Element
   * @param {PermissionService} permission - Permission service
   */
  constructor(private el: ElementRef, private permission: PermissionService) {
    if (!this.permission.isAllowed(this.operation)) {
      el.nativeElement.style.display = 'none';
    }
  }
}
