import { sandboxOf } from 'angular-playground';
import { ConfigureButtonComponent } from './configure-button.component';

export default sandboxOf(ConfigureButtonComponent)
  .add('configure button - big', {
    template: `
              <div>
               <configure-button 
               style="height: 55px; width: 120px; font-size: 16px"
               [value]="'ADD'"
               ></configure-button></div>`
  })
  .add('configure button - small', {
    template: `
              <div>
               <configure-button 
               style="height: 36px; width: 118px; font-size: 14px"
               [value]="'SMALL'"
               ></configure-button></div>`
  });
