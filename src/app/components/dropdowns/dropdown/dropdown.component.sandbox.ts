import { sandboxOf } from 'angular-playground';
import { DropDownComponent } from "./dropdown.component";
import { BsDropdownModule } from 'ngx-bootstrap';

export default sandboxOf(DropDownComponent, { imports: [ BsDropdownModule.forRoot() ] })
  .add('small', {
    template: `<dropdown 
               [title]="title"
               [options]="options"
               [size]="size"
               (typeChanged)="onTypeChanged($event)"
               ></dropdown>`,
    context: {
      title: "Most recent",
      options: [{ id: 1, action: 'Unarchived' },{ id: 2, action: 'Archived' }],
      size: 'small',
      onTypeChanged(event) {
        console.log("onTypeChanged");
        console.log(event);
      }
    }
  })

  .add('medium', {
    template: `<dropdown 
               [title]="'Action'"
               [options]="[{ id: 1, action: 'Unarchived' },{ id: 2, action: 'Archived' }]"
               [size]="'medium'"
               (typeChanged)="onTypeChanged($event)"
               ></dropdown>`
  });

