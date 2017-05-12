import { sandboxOf } from 'angular-playground';
import { UploadButtonComponent } from "./upload-button.component";
import { TestComponent } from "../test.component";

export default sandboxOf(UploadButtonComponent)
  .add('stylized upload button', {
    template: `<upload-button (imgUploaded)="onImgUploaded($event)"></upload-button>`

  })
  .add('default upload button', {
    template: `<input type="file" name="images" accept=".jpg, .png">`
  });
