import { sandboxOf } from 'angular-playground';
import { SwitcherComponent } from "./switcher.component";
import { FormsModule } from "@angular/forms";

export default sandboxOf(SwitcherComponent, { imports: [FormsModule] })
  .add('switcher', {
    template: `<switcher style="padding: 10px" [options]="options" (toggle)="value=$event"></switcher>
               You chose: {{ value}}`,
    context: {
      value: '',
      options: ['Option 1', 'Option 2']
    }
  });
