import { sandboxOf } from 'angular-playground';
import { DropDownComponent } from './dropdown.component';
import { SelectModule } from 'ng2-select';
import { FoxSelectComponent } from './fox-select.component';
import { FormsModule } from '@angular/forms';

export default sandboxOf(FoxSelectComponent, { imports: [ SelectModule, FormsModule] })
  .add('fox-select', {
    template: `<fox-select
                   style="width: 250px; margin-bottom: 20px"
                   >
 
                    </fox-select>`
  });
