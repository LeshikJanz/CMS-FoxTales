import { sandboxOf } from 'angular-playground';
import { EventGroupComponent } from "./event-group.component";
import { CheckboxComponent } from "../toggles/checkbox/checkbox.component";
import { ActionDropDownComponent } from "../dropdowns/action-dropdown/action-dropdown.component";
import { BsDropdownModule } from "ngx-bootstrap";

export default sandboxOf(EventGroupComponent, {declarations: [ActionDropDownComponent],
  imports: [ BsDropdownModule.forRoot() ]})
  .add('default event group', {
    template: `<event-group
                style="width: 700px"
              ></event-group>`,
    context: [ActionDropDownComponent]
  })
