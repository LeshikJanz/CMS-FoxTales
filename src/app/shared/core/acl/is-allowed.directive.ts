import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { PermissionService } from '../auth/permission.service';

/**
 * Hide element if operation is not allowed
 */
@Directive({
  selector: '[isAllowed]'
})
export class IsAllowedDirective implements OnInit {
  /**
   * Operation name
   *
   * @type {string}
   */
  @Input('isAllowed')
  public operation: string;

  /**
   * Constructor
   *
   * @param {ElementRef} el - Element
   * @param {PermissionService} permission - Permission service
   */
  constructor(private el: ElementRef, private permission: PermissionService) {
  }

  public ngOnInit(): void {
    if (!this.permission.isAllowed(this.operation)) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
