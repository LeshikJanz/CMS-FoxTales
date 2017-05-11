import { sandboxOf } from 'angular-playground';
import { UploadButtonComponent } from "./upload-button.component";

export default sandboxOf(UploadButtonComponent)
  .add('with simple text', {
    template: `<h1>ABC</h1>`
  });
