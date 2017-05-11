import { sandboxOf } from 'angular-playground';
import { DropDownSelectComponent } from "./dropdown-select.component";

export default sandboxOf(DropDownSelectComponent)
  .add('simple dropdown select', {
    template: `<dropdown-select
        [options]="[{ id: 1, state: 'Unarchived' },{ id: 2, state: 'Archived' }]"
        (typeChanged)="onTypeChanged($event)">
      </dropdown-select>`
  })
