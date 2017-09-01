import { sandboxOf } from 'angular-playground';
import { IconButtonComponent } from './icon-button.component';

export default sandboxOf(IconButtonComponent)
  .add('icon button - Content', {
    template: `
               <icon-button 
               [type]="'Content'"
               ></icon-button>`
  })
  .add('icon button - Email', {
    template: `
               <icon-button 
               [type]="'Email'"
               ></icon-button>`
  })
  .add('icon button - Feeds', {
    template: `
               <icon-button 
               [type]="'Feeds'"
               ></icon-button>`
  })
  .add('icon button - Gallery', {
    template: `
               <icon-button 
               [type]="'Gallery'"
               ></icon-button>`
  })
  .add('icon button - Interface', {
    template: `
               <icon-button 
               [type]="'Interface'"
               ></icon-button>`
  })
  .add('icon button - Social', {
    template: `
               <icon-button 
               [type]="'Social'"
               ></icon-button>`
  });
