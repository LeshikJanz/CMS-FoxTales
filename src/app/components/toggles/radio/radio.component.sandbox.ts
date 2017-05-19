import { sandboxOf } from 'angular-playground';
import { RadioComponent } from './radio.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(RadioComponent, { imports: [FormsModule] })
  .add('radio', {
    template: `<radio style="padding: 10px" [options]="options" (toggle)="value=$event"></radio>
               You chose: {{ value}}`,
    context: {
      value: '',
      options: ['First', 'Second', 'Third']
    }
  });
