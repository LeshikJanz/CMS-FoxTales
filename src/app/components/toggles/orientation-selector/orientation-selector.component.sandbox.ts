import { sandboxOf } from 'angular-playground';
import { OrientationSelectorComponent } from './orientation-selector.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(OrientationSelectorComponent, { imports: [FormsModule] })
  .add('orientation-selector', {
    template: `<orientation-selector [options]="options"
 (onChange)="value=$event"></orientation-selector>`,
    context: {
      value: '',
      options: ['topLeft', 'topMid', 'topRight', 'midLeft', 'mid',
        'midRight', 'botLeft', 'botMid', 'botRight']
    }
  });
