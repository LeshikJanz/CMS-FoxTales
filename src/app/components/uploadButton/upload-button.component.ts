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
  public uploadState: number = 0;
  public error: string;
  public isLoading: boolean = false;

  @Input() public filesAllowed: boolean;

  @Output() public imgUploaded: EventEmitter<string> = new EventEmitter();

  public handlePictureChange(event) {
    this.getBase64(event.target.files[0]);
  }

  public handleLoading = () => this.isLoading = true;

  public getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result.indexOf('data:image') >= 0 || this.filesAllowed) {
        this.uploadState = 1;
        this.isLoading = false;
        this.imgUploaded.emit(reader.result);
      } else {
        this.error = 'Chosen file is not an image';
        this.isLoading = false;
        this.uploadState = 2;
      }
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
}
