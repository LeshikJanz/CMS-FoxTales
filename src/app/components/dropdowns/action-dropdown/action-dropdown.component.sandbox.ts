import { sandboxOf } from 'angular-playground';
import { ActionDropDownComponent } from "./action-dropdown.component";
import { BsDropdownModule } from "ngx-bootstrap";

export default sandboxOf(ActionDropDownComponent, { imports: [ BsDropdownModule.forRoot() ]})
  .add('dropdown with actions', {
    template: `<action-dropdown
        [options]="options"
        (typeChanged)="onTypeChanged($event)">
      </action-dropdown>`,
    context: {
      options: [{ id: 1, action: 'Unarchived' },{ id: 2, action: 'Archived' }],
      onTypeChanged(event) {
        console.log("onTypeChanged");
        console.log(event);
      }
    }
  })
