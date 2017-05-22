import { sandboxOf } from 'angular-playground';
import { ThumbnailComponent } from './thumbnail.component';

export default sandboxOf(ThumbnailComponent)
  .add('thumbnail component', {
    template: `<thumbnail></thumbnail>`
  })
