import { sandboxOf } from 'angular-playground';
import { UploadButtonComponent } from "./upload-button.component";

export default sandboxOf(UploadButtonComponent)
  .add('with simple text', {
    template: `<upload-button></upload-button>`
  });
