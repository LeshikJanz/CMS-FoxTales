import { sandboxOf } from 'angular-playground';
import { SwitcherComponent } from './switcher.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(SwitcherComponent, { imports: [FormsModule] })
  .add('switcher enabled', {
    template: `<switcher style="padding: 10px" 
                [options]="options" (toggle)="value=$event"></switcher>
               You chose: {{ value}}`,
    context: {
      value: '',
      options: [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' },
      ]
    }
  })

  .add('switcher disabled', {
    template: `<switcher style="padding: 10px" [disabled]="true"
                [options]="options" (toggle)="value=$event"></switcher>
               You chose: {{ value}}`,
    context: {
      value: '',
      options: [{ id: 1, name: 'Option 1' }, { id: 2, name: 'Option 2' }]
    }
  });
