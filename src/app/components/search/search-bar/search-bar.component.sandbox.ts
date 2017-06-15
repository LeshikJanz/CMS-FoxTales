import { sandboxOf } from 'angular-playground';
import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(SearchBarComponent, { imports: [FormsModule] })
  .add('search-bar', {
    template: `<search-bar style="width: 30px; height: 65px;"
              (Change)="value=$event"></search-bar>
               You wrote: {{ value }}`,
    context: {
      title: 'Fox input',
    }  });
