import { sandboxOf } from 'angular-playground';
import { EventComponent } from "./event.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";

export default sandboxOf(EventComponent, {declarations: [CheckboxComponent], })
  .add('default event', {
    template: `<event
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="0"
                ></event>`,
    context: [CheckboxComponent]
  })
  .add('warning event', {
    template: `<event
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="-1"
                ></event>`,
    context: [CheckboxComponent]
  })
  .add('success event', {
    template: `<event
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="1"
                ></event>`,
    context: [CheckboxComponent]
  });
