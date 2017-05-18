import { sandboxOf } from 'angular-playground';
import { FoxButtonComponent } from './fox-button.component';

export default sandboxOf(FoxButtonComponent)
  .add('primary button - big', {
    template: `
              <div>
               <fox-button 
               style="height: 55px; width: 120px; font-size: 16px"
               [value]="'PRIMARY'"
               [type]="'primary'"
               ></fox-button></div>`
  })
  .add('primary button - small', {
    template: `
              <div>
               <fox-button 
               style="height: 36px; width: 118px; font-size: 14px"
               [value]="'SMALL'"
               [type]="'primary'"
               ></fox-button></div>`
  })
  .add('secondary button - big', {
    template: `
              <div>
               <fox-button 
               style="height: 55px; width: 120px; font-size: 16px"
               [value]="'SECONDARY'"
               [type]="'secondary'"
               ></fox-button></div>`
  })
  .add('secondary button - small', {
    template: `
              <div>
               <fox-button 
               style="height: 36px; width: 118px; font-size: 14px"
               [value]="'SMALL'"
               [type]="'secondary'"
               ></fox-button></div>`
  })
  .add('tertiary button - big', {
    template: `
              <div>
               <fox-button 
               style="height: 55px; width: 120px; font-size: 16px"
               [value]="'TERTIARY'"
               [type]="'tertiary'"
               ></fox-button></div>`
  })
  .add('tertiary button - small', {
    template: `
              <div>
               <fox-button 
               style="height: 36px; width: 118px; font-size: 14px"
               [value]="'SMALL'"
               [type]="'tertiary'"
               ></fox-button></div>`
  })
  .add('special button - big', {
    template: `
              <div>
               <fox-button 
               style="height: 55px; width: 120px; font-size: 16px"
               [value]="'SPECIAL'"
               [type]="'special'"
               ></fox-button></div>`
  })
  .add('special button - small', {
    template: `
              <div>
               <fox-button 
               style="height: 36px; width: 118px; font-size: 14px"
               [value]="'SMALL'"
               [type]="'special'"
               ></fox-button></div>`
  })
  .add('gray button - big', {
    template: `
              <div>
               <fox-button 
               style="height: 55px; width: 120px; font-size: 16px"
               [value]="'GRAY'"
               [type]="'gray'"
               ></fox-button></div>`
  })
  .add('gray button - small', {
    template: `
              <div>
               <fox-button 
               style="height: 36px; width: 118px; font-size: 14px"
               [value]="'SMALL'"
               [type]="'gray'"
               ></fox-button></div>`
  });
