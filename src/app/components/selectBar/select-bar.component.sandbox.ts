import { sandboxOf } from 'angular-playground';
import { SelectBarComponent } from './select-bar.component';

export default sandboxOf(SelectBarComponent)
  .add('select-bar', {
    template: `<select-bar
                [selected]="30"
                [size]="60"
                (deleteSelected)="onDeleteSelected()"
                (cloneSelected)="onCloneSelected()"
                (deselectAll)="onDeselectAll()"
              ></select-bar>`,
    context: {
      onDeleteSelected() {
        console.log('onDeleteSelected');
      },
      onCloneSelected() {
        console.log('onCloneSelected');
      },
      onDeselectAll() {
        console.log('onDeselectAll');
      }
    }
  });
