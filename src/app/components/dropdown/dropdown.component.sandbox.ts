import { sandboxOf } from 'angular-playground';
import { DropDownComponent } from "./dropdown.component";
import { BsDropdownModule } from 'ngx-bootstrap';

export default sandboxOf(DropDownComponent, { imports: [ BsDropdownModule.forRoot() ] })
  .add('dropdown', {
    template: `<dropdown 
        [options]="[{ id: 1, action: 'Unarchived' },{ id: 2, action: 'Archived' }]"
               (typeChanged)="onTypeChanged($event)"
               ></dropdown>`
  })

