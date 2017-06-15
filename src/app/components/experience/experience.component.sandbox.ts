import { sandboxOf } from 'angular-playground';
import { ExperienceComponent } from './experience.component';
import { CheckboxComponent } from '../toggles/checkbox/checkbox.component';
import { ActionDropDownComponent } from '../dropdowns/action-dropdown/action-dropdown.component';
import { BsDropdownModule } from 'ngx-bootstrap';

export default sandboxOf(ExperienceComponent, {
  declarations: [CheckboxComponent, ActionDropDownComponent],
  imports: [BsDropdownModule.forRoot()]
})
  .add('default experience', {
    template: `<experience
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="0"
                [eventActions]="eventActions"
                ></experience>`,
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
  .add('warning experience', {
    template: `<experience
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="-1"
                [eventActions]="eventActions"
                ></experience>`,
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
  .add('success experience', {
    template: `<experience
                [name]="'TestEvent'"
                [tags]="['firstTag', 'secondTag', 'thirdTag']"
                [expCount]="7"
                [status]="1"
                [eventActions]="eventActions"
                ></experience>`,
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
