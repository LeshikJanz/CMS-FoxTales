import { sandboxOf } from 'angular-playground';
import { FormDropDownComponent } from './form-dropdown.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { PermissionService } from '../../../shared/core/auth/permission.service';
import { Http } from '@angular/http';

export default sandboxOf(FormDropDownComponent,
  {providers: [PermissionService, Http], imports: [BsDropdownModule.forRoot()]})
  .add('form-dropdown', {
    template: `
              <div >
               <form-dropdown 
               [title]='title'
               [options]='options'
               (typeChanged)='onTypeChanged($event)'
               ></form-dropdown></div>`,
    context: {
      title: 'Most recent',
      options: [{id: 1, action: 'Upcoming', callback: 'upcomingSort'},
        {id: 2, action: 'Descending', callback: 'descendingSort'},
        {id: 3, action: 'Start date', callback: 'startDateSort'},
        {id: 4, action: 'End date', callback: 'endDateSort'}],
      onTypeChanged(event) {
        console.log('onTypeChanged');
        console.log(event);
      }
    },
    providers: [PermissionService, Http]
  });
