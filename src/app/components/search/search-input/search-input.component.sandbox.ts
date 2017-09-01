import { sandboxOf } from 'angular-playground';
import { SearchInputComponent } from './search-input.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(SearchInputComponent, { imports: [FormsModule] })
  .add('search-input', {
    template: `<search-input style="width: 300px; height: 65px;"
              [title]="'title'" (Change)="value=$event"></search-input>
               You wrote: {{ value }}`,
    context: {
      title: 'Fox input',
    }  });
