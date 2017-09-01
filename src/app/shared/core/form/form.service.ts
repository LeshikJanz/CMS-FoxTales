import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Form service
 */
@Injectable()
export class FormService {

  /**
   * Global function for populating form inputs
   *
   * @param {any} elem - input element
   * @param {FormGroup} form - form group
   */
  public static populateForm(elem: any, form: FormGroup): void {
    Object.keys(elem).forEach((field: string) => {
      const formField = form.get(field);

      if (formField) {
        formField.setValue(elem[field]);
      }
    });
  }
}
