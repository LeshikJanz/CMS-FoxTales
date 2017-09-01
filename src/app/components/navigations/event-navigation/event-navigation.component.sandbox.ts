import { sandboxOf } from 'angular-playground';
import { EventNavigationComponent } from './event-navigation.component';

export default sandboxOf(EventNavigationComponent)
  .add('event-navigation', {
    template: `<event-navigation></event-navigation>`
  });
