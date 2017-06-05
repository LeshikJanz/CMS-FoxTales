import { sandboxOf } from 'angular-playground';
import { DropDownComponent } from './dropdown.component';
import { BsDropdownModule } from 'ngx-bootstrap';

export default sandboxOf(DropDownComponent, { imports: [ BsDropdownModule.forRoot() ] })
  .add('small', {
    template: `
              <div >
               <dropdown 
               [title]="title"
               [options]="options"
               [size]="'small'"
               (typeChanged)="onTypeChanged($event)"
               ></dropdown></div>`,
    context: {
      title: 'Most recent',
      options: [ { id: 1, action: 'Unarchived' }, { id: 2, action: 'Archived' } ],
      size: 'small',
      onTypeChanged(event) {
        console.log('onTypeChanged');
        console.log(event);
      }
    }
  })

  .add('medium', {
    template: `<div style="margin-left: 100px"><dropdown 
               [title]="'Action'"
               [options]="options"
               [size]="'medium'"
               (typeChanged)="onTypeChanged($event)"
               ></dropdown></div>`,
    context: {
      title: 'Most recent',
      options: [ { id: 1, action: 'Unarchived' }, { id: 2, action: 'Archived' } ],
      size: 'small',
      onTypeChanged(event) {
        console.log('onTypeChanged');
        console.log(event);
      }
    }
  })

  .add('big', {
    template: `<div style="margin-left: 100px"><dropdown 
               [title]="'Action'"
               [options]="options"
               [size]="'big'"
               (typeChanged)="onTypeChanged($event)"
               ></dropdown></div>`,
    context: {
      title: 'Most recent',
      options: [ { id: 1, action: 'Unarchived' }, { id: 2, action: 'Archived' } ],
      size: 'small',
      onTypeChanged(event) {
        console.log('onTypeChanged');
        console.log(event);
      }
    }
  });
