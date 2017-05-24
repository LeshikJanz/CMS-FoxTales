import { sandboxOf } from 'angular-playground';
import { ScrollComponent } from './scroll.component';
import { CheckboxComponent } from '../toggles/checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(ScrollComponent,
  { declarations: [CheckboxComponent], imports: [FormsModule] })
  .add('scroll', {
    template: `<scroll style='width: 300px; max-height: 100px;'
                [options]="options" (chose)="item = $event"></scroll>
               You chose: {{item}}`,
    context: {
      options: [{name: 'Group name 1'}, { name: 'Group name 2'},
              {name: 'Group name 3'}, {name: 'Group name 4'}, {name: 'Group name 5'}],
      CheckboxComponent
    }
  });
