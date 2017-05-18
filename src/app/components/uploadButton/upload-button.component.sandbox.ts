import { sandboxOf } from 'angular-playground';
import { UploadButtonComponent } from './upload-button.component';

export default sandboxOf(UploadButtonComponent)
  .add('stylized upload button', {
    template: `<upload-button (imgUploaded)="onImgUploaded($event)"></upload-button>`,
    context: {
      onImgUploaded(event) {
        console.log('onImgUploaded');
        console.log(event);
      }
    }
  })
  .add('default upload button', {
    template: `<input type="file" name="images" accept=".jpg, .png">`
  });
