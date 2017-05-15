import { sandboxOf } from 'angular-playground';
import { ExperienceNavigationComponent } from "./experience-navigation.component";

export default sandboxOf(ExperienceNavigationComponent)
  .add('experience-navigation', {
    template: `<experience-navigation></experience-navigation>`
  });
