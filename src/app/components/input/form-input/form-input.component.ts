import { Component, OnChanges, Input, SimpleChanges, forwardRef } from '@angular/core';
import { FormGroup, NgModel, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { noop } from "rxjs/util/noop";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormInputComponent),
  multi: true
};

@Component({
  selector: 'form-input',
  templateUrl: 'form-input.component.html',
  styleUrls: ['form-input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class FormInputComponent implements OnChanges {
  /**
   * Parent form element
   *
   * @tyoe {FormGroup}
   */
  @Input()
  public form: FormGroup;

  /**
   * is form input disabled?
   *
   * @tyoe {boolean}
   */
  @Input()
  public disabled: boolean;

  /**
   * Form control name
   *
   * @tyoe {string}
   */
  @Input()
  public controlName: string = '';

  /**
   * Field label
   *
   * @tyoe {string}
   */
  @Input()
  public title: string = '';

  /**
   * Initial field value
   *
   * @type {string}
   */
  @Input()
  public value: string = '';

  /**
   * Custom message on validation error
   *
   * @tyoe {string}
   */
  @Input()
  public errorMsg: string = 'Invalid value';

  public ngOnChanges() {
    this.form.get(this.controlName).setValue(this.value, { onlySelf: true });
  }
}
