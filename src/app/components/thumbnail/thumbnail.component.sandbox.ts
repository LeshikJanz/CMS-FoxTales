import { sandboxOf } from 'angular-playground';
import { ThumbnailComponent } from './thumbnail.component';

export default sandboxOf(ThumbnailComponent)
  .add('thumbnail component', {
    template: `<thumbnail style="height: 362px; width: 250px"></thumbnail>`
  })
