import { sandboxOf } from 'angular-playground';
import { CheckboxComponent } from './checkbox.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(CheckboxComponent, { imports: [FormsModule] })
  .add('checkboxes', {
    template: `<checkbox 
                style="height: 32px; width: 32px; font-size: 12px;"
                (toggle)="isChecked=$event"></checkbox>
              <br>isChecked: {{isChecked.name}}`
  });
