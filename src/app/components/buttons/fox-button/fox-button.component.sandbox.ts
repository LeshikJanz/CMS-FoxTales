import { sandboxOf } from 'angular-playground';
import { FoxButtonComponent } from './fox-button.component';

export default sandboxOf(FoxButtonComponent)
  .add('primary button - big', {
    template: `
              <div>
               <fox-button 
               style="height: 55px; width: 120px; font-size: 16px"
               [value]="'PRIMARY'"
               [design]="'primary'"
               ></fox-button></div>`
  })
  .add('primary button - small', {
    template: `
              <div>
               <fox-button 
               style="height: 36px; width: 118px; font-size: 14px"
               [value]="'SMALL'"
               [design]="'primary'"
               ></fox-button></div>`
  })
  .add('secondary button - big', {
    template: `
              <div>
               <fox-button 
               style="height: 55px; width: 120px; font-size: 16px"
               [value]="'SECONDARY'"
               [design]="'secondary'"
               ></fox-button></div>`
  })
  .add('secondary button - small', {
    template: `
              <div>
               <fox-button 
               style="height: 36px; width: 118px; font-size: 14px"
               [value]="'SMALL'"
               [design]="'secondary'"
               ></fox-button></div>`
  })
  .add('tertiary button - big', {
    template: `
              <div>
               <fox-button 
               style="height: 55px; width: 120px; font-size: 16px"
               [value]="'TERTIARY'"
               [design]="'tertiary'"
               ></fox-button></div>`
  })
  .add('tertiary button - small', {
    template: `
              <div>
               <fox-button 
               style="height: 36px; width: 118px; font-size: 14px"
               [value]="'SMALL'"
               [design]="'tertiary'"
               ></fox-button></div>`
  })
  .add('special button - big', {
    template: `
              <div>
               <fox-button 
               style="height: 55px; width: 120px; font-size: 16px"
               [value]="'SPECIAL'"
               [design]="'special'"
               ></fox-button></div>`
  })
  .add('special button - small', {
    template: `
              <div>
               <fox-button 
               style="height: 36px; width: 118px; font-size: 14px"
               [value]="'SMALL'"
               [design]="'special'"
               ></fox-button></div>`
  })
  .add('gray button - big', {
    template: `
              <div>
               <fox-button 
               style="height: 55px; width: 120px; font-size: 16px"
               [value]="'GRAY'"
               [design]="'gray'"
               ></fox-button></div>`
  })
  .add('gray button - small', {
    template: `
              <div>
               <fox-button 
               style="height: 36px; width: 118px; font-size: 14px"
               [value]="'SMALL'"
               [design]="'gray'"
               ></fox-button></div>`
  });
