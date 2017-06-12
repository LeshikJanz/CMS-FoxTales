import { sandboxOf } from 'angular-playground';
import { TableInputComponent } from './table-input.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(TableInputComponent, { imports: [FormsModule] })
  .add('table-input', {
    template: `<fox-input style="width: 300px; height: 65px;"
              [title]="'title'" (Change)="value=$event"></fox-input>
               You wrote: {{ value }}`,
    context: {
      title: 'Table input',
    }  });
