import { sandboxOf } from 'angular-playground';
import { TableInputComponent } from './table-input.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(TableInputComponent, { imports: [FormsModule] })
  .add('table-input', {
    template: `<table-input style="position: absolute; top: 100px; width: 300px; height: 65px;"
              [title]="'title'" (Change)="value=$event"></table-input>
               You wrote: {{ value }}`,
    context: {
      title: 'Table input',
    }  });
