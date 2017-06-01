import { sandboxOf } from 'angular-playground';
import { EventsNavigationComponent } from './events-navigation.component';

export default sandboxOf(EventsNavigationComponent)
  .add('event-navigation', {
    template: `<events-navigation></events-navigation>`
  });
