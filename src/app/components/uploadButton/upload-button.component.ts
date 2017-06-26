import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Upload Button component
 */
@Component({
  selector: 'upload-button',
  templateUrl: 'upload-button.component.html',
  styleUrls: ['upload-button.component.scss']
})
export class UploadButtonComponent {
  public error: string;
  public isLoading: boolean = false;

  @Input() public uploadState: number = 0;

  @Input() public filesAllowed: boolean;

  @Output() public uploadStateChange = new EventEmitter();

  @Output() public imgUploaded: EventEmitter<any> = new EventEmitter();

  public set uploadStateValue(val: number) {
    this.uploadState = val;
    this.uploadStateChange.emit(this.uploadState);
  }

  public handlePictureChange(event) {
    this.getBase64(event.target.files[0]);
  }

  public handleLoading = () => this.isLoading = true;

  public getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result.indexOf('data:image') >= 0 || this.filesAllowed) {
        this.uploadStateValue = 1;
        this.isLoading = false;
        this.imgUploaded.emit({base64: reader.result, file: file});
      } else {
        this.error = 'Chosen file is not an image';
        this.isLoading = false;
        this.uploadStateValue = 2;
      }
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
}
