import { sandboxOf } from 'angular-playground';
import { EventTagComponent } from './event-tag.component';

export default sandboxOf(EventTagComponent)
  .add('event tag', {
    template: `<event-tag
                [title]="'Event Name'"
                ></event-tag>`
  });
