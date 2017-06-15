import { sandboxOf } from 'angular-playground';
import { TrackNavigationComponent } from './track-navigation.component';

export default sandboxOf(TrackNavigationComponent)
  .add('track-navigation', {
    template: `<track-navigation></track-navigation>`
  });
