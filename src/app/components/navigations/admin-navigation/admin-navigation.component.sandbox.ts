import { sandboxOf } from 'angular-playground';
import { AdminNavigationComponent } from "./admin-navigation.component";

export default sandboxOf(AdminNavigationComponent)
  .add('admin-navigation', {
    template: `<admin-navigation></admin-navigation>`
  });
