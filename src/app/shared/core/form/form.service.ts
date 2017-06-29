import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Permission service
 */
@Injectable()
export class FormService {

  /**
   * Global clientId variable
   *
   * @type {number}
   */
  public static populateForm(elem: any, form: FormGroup) {
    Object.keys(elem).forEach((field: string) => {
      const formField = form.get(field);

      if (formField) {
        formField.setValue(elem[field]);
      }
    });
  }
}
