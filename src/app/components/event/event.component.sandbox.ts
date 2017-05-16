import { sandboxOf } from 'angular-playground';
import { EventComponent } from "./event.component";
import { CheckboxComponent } from "../toggles/checkbox/checkbox.component";
import { ActionDropDownComponent } from "../dropdowns/action-dropdown/action-dropdown.component";
import { BsDropdownModule } from "ngx-bootstrap";

export default sandboxOf(EventComponent, {declarations: [CheckboxComponent, ActionDropDownComponent],
  imports: [ BsDropdownModule.forRoot() ]})
  .add('default event', {
    template: `<event
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="0"
                ></event>`,
    context: [CheckboxComponent, ActionDropDownComponent]
  })
  .add('warning event', {
    template: `<event
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="-1"
                ></event>`,
    context: [CheckboxComponent, ActionDropDownComponent]
  })
  .add('success event', {
    template: `<event
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="1"
                ></event>`,
    context: [CheckboxComponent, ActionDropDownComponent]
  });
