import { sandboxOf } from 'angular-playground';
import { CheckboxComponent } from "./checkbox.component";

export default sandboxOf(CheckboxComponent)
  .add('checkboxes', {
    template: `<fox-checkbox></fox-checkbox>`
  });
