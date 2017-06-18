import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-input',
  templateUrl: 'form-input.component.html',
  styleUrls: ['form-input.component.scss']
})

export class FormInputComponent {
  /**
   * Parent form element
   *
   * @tyoe {FormGroup}
   */
  @Input()
  public form: FormGroup;

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
   * Is field required?
   *
   * @tyoe {boolean}
   */
  @Input()
  public isRequired: boolean = false;

  /**
   * Initial field value
   *
   * @tyoe {string}
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
}
