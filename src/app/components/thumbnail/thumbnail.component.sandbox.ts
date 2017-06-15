import { sandboxOf } from 'angular-playground';
import { ThumbnailComponent } from './thumbnail.component';
import { CheckboxComponent } from '../toggles/checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

export default sandboxOf(ThumbnailComponent, { declarations: [CheckboxComponent],
  imports: [FormsModule, ProgressbarModule.forRoot()] })
  .add('thumbnail component', {
    template: `<thumbnail 
                style="height: 262px; width: 250px; background-color: transparent;"
                [title]="'Title of Thumbnail'"
                [type]="'Type'"
                [progress]="80"
                (toggle)="isChecked=$event"
                (confirm)="onConfirm()"
                (decline)="onDecline()"
                ></thumbnail>
<div>Is Checked: {{isChecked}}</div>`,
    context: {
      onConfirm() {
        console.log('onConfirm');
      },
      onDecline() {
        console.log('onDecline');
      },
      CheckboxComponent
    }
  });
