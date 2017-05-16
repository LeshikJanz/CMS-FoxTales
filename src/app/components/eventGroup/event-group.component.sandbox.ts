import { sandboxOf } from 'angular-playground';
import { EventGroupComponent } from "./event-group.component";
import { CheckboxComponent } from "../toggles/checkbox/checkbox.component";
import { ActionDropDownComponent } from "../dropdowns/action-dropdown/action-dropdown.component";
import { BsDropdownModule } from "ngx-bootstrap";
import { EventComponent } from "../event/event.component";

export default sandboxOf(EventGroupComponent, {
  declarations: [CheckboxComponent, EventComponent, ActionDropDownComponent],
  imports: [ BsDropdownModule.forRoot() ]})
  .add('default event group', {
    template: `<event-group
                [event]="event"
                style="width: 700px"
              ></event-group>`,
    context: [CheckboxComponent, EventComponent, ActionDropDownComponent]
  })
