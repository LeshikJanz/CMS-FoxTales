import { sandboxOf } from 'angular-playground';
import { ScrollComponent } from './scroll.component';

export default sandboxOf(ScrollComponent)
  .add('scroll', {
    template: `<scroll style='width: 300px; max-height: 65px;'
                [options]="options" (chose)="value=$event"></scroll>
               You chose: {{ value }}`,
    context: {
      options: ['1', '2', '3', '4', '5']
    }
  });
