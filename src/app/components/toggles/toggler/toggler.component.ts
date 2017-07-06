import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'toggler',
  templateUrl: 'toggler.component.html',
  styleUrls: ['toggler.component.scss']
})

// Works absolutely same as form-input
export class TogglerComponent {
  /**
   * Form control
   *
   * @type {FormControl}
   */
  @Input()
  public control: FormControl;

  /**
   * Is form input disabled?
   *
   * @type {boolean}
   */
  @Input()
  public disabled: boolean = false;
}
