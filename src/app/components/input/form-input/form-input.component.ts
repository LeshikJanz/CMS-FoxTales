import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'form-input',
  templateUrl: 'form-input.component.html',
  styleUrls: ['form-input.component.scss']
})

export class FormInputComponent {
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
  public disabled: boolean;

  /**
   * Field label
   *
   * @type {string}
   */
  @Input()
  public title: string = '';

  /**
   * Custom message on validation error
   *
   * @type {string}
   */
  @Input()
  public errorMsg: string = 'Invalid value';
}
