import { sandboxOf } from 'angular-playground';
import { ScrollComponent } from './scroll.component';
import { CheckboxComponent } from "../toggles/checkbox/checkbox.component";

export default sandboxOf(ScrollComponent, { declarations: [CheckboxComponent] })
  .add('scroll', {
    template: `<scroll style='width: 300px; max-height: 100px;'
                [options]="options" (chose)="items = $event"></scroll>
               You chose: <div *ngFor="let item of items" >{{item}}</div>`,
    context: {
      options: ['Group name 1', 'Group name 2', 'Group name 3', 'Group name 4', 'Group name 5'],
      CheckboxComponent
    }
  });
