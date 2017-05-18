import { sandboxOf } from 'angular-playground';
import { BsDropdownModule } from 'ngx-bootstrap';
import { GroupDropDownComponent } from "./group-dropdown.component";

export default sandboxOf(GroupDropDownComponent, { imports: [ BsDropdownModule.forRoot() ]})
  .add('dropdown with actions', {
    template: `
        <div style="margin-left: 100px">
        <group-dropdown
        [options]="options"
        (typeChanged)="onTypeChanged($event)">
      </group-dropdown>
</div>`,
    context: {
      options: [{ id: 1, action: 'Unarchived' }, { id: 2, action: 'Archived' }],
      onTypeChanged(event) {
        console.log('onTypeChanged');
        console.log(event);
      }
    }
  });
