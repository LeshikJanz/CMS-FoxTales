import { sandboxOf } from 'angular-playground';
import { AddButtonComponent } from './add-button.component';

export default sandboxOf(AddButtonComponent)
  .add('add button - big', {
    template: `
              <div>
               <add-button 
               style="height: 55px; width: 120px; font-size: 16px"
               [value]="'ADD'"
               ></add-button></div>`
  })
  .add('add button - small', {
    template: `
              <div>
               <add-button 
               style="height: 36px; width: 118px; font-size: 14px"
               [value]="'SMALL'"
               ></add-button></div>`
  })
