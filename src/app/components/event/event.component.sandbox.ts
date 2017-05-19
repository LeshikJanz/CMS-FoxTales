import { sandboxOf } from 'angular-playground';
import { EventComponent } from './event.component';
import { CheckboxComponent } from '../toggles/checkbox/checkbox.component';
import { ActionDropDownComponent } from '../dropdowns/action-dropdown/action-dropdown.component';
import { BsDropdownModule } from 'ngx-bootstrap';

export default sandboxOf(EventComponent, {
  declarations: [CheckboxComponent, ActionDropDownComponent],
  imports: [BsDropdownModule.forRoot()]
})
  .add('default event', {
    template: `<event
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="0"
                [eventActions]="eventActions"
                ></event>`,
    context: [CheckboxComponent, ActionDropDownComponent, {
      eventActions: [
        {id: 1, action: 'SETTINGS'},
        {id: 2, action: 'CLONE'},
        {id: 3, action: 'ARCHIEVE'},
        {id: 4, action: 'ADD TO GROUP'},
        {id: 5, action: 'ASSIGN USERS'},
      ]
    }]
  })
  .add('warning event', {
    template: `<event
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="-1"
                [eventActions]="eventActions"
                ></event>`,
    context: [CheckboxComponent, ActionDropDownComponent, {
      eventActions: [
        {id: 1, action: 'SETTINGS'},
        {id: 2, action: 'CLONE'},
        {id: 3, action: 'ARCHIEVE'},
        {id: 4, action: 'ADD TO GROUP'},
        {id: 5, action: 'ASSIGN USERS'},
      ]
    }]
  })
  .add('success event', {
    template: `<event
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="1"
                [eventActions]="eventActions"
                ></event>`,
    context: [CheckboxComponent, ActionDropDownComponent, {
      eventActions: [
        {id: 1, action: 'SETTINGS'},
        {id: 2, action: 'CLONE'},
        {id: 3, action: 'ARCHIEVE'},
        {id: 4, action: 'ADD TO GROUP'},
        {id: 5, action: 'ASSIGN USERS'},
      ]
    }]
  });
