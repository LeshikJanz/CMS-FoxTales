import { sandboxOf } from 'angular-playground';
import { RadioComponent } from "./radio.component";
import { FormsModule } from "@angular/forms";

export default sandboxOf(RadioComponent, { imports: [FormsModule] })
  .add('checkboxes', {
    template: `<radio style="padding: 10px" (toggle)="value=$event"></radio>
               You chose: {{ value}}`,
    context: {
      value: ''
    }
  });
