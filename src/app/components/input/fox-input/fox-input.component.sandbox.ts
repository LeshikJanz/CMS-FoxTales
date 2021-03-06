import { sandboxOf } from 'angular-playground';
import { FoxInputComponent } from './fox-input.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(FoxInputComponent, { imports: [FormsModule] })
  .add('fox-input', {
    template: `<fox-input style="width: 300px; height: 65px;"
              [title]="'title'" (Change)="value=$event"></fox-input>
               You wrote: {{ value }}`,
    context: {
      title: 'Fox input',
    }  });
