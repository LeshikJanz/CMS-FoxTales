import { sandboxOf } from 'angular-playground';
import { EventComponent } from "./event.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { DropDownSelectComponent } from "../dropdowns/dropdown-select/dropdown-select.component";

export default sandboxOf(EventComponent, {declarations: [CheckboxComponent, DropDownSelectComponent], })
  .add('default event', {
    template: `<event
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="0"
                ></event>`,
    context: [CheckboxComponent, DropDownSelectComponent]
  })
  .add('warning event', {
    template: `<event
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="-1"
                ></event>`,
    context: [CheckboxComponent, DropDownSelectComponent]
  })
  .add('success event', {
    template: `<event
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="1"
                ></event>`,
    context: [CheckboxComponent, DropDownSelectComponent]
  });
