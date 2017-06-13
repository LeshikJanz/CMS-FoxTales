import { sandboxOf } from 'angular-playground';
import { RegularInputComponent } from './regular-input.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(RegularInputComponent, { imports: [FormsModule] })
  .add('table-input', {
    template: `<regular-input style="position: absolute; top: 100px; width: 300px; height: 65px;"
              [title]="'title'" (Change)="value=$event"></regular-input>
               You wrote: {{ value }}`,
    context: {
      title: 'Table input',
    }  });
