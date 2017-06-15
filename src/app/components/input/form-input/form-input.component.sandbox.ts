import { sandboxOf } from 'angular-playground';
import { FormInputComponent } from './form-input.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(FormInputComponent, { imports: [FormsModule] })
  .add('form-input', {
    template: `<form-input style="position: absolute; top: 100px; width: 300px; height: 65px;"
              [title]="'title'" (Change)="value=$event"></form-input>
               You wrote: {{ value }}`,
    context: {
      title: 'Form input',
    }  });
