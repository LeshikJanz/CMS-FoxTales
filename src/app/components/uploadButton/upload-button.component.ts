import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Upload Button component
 */
@Component({
  selector: 'upload-button',
  templateUrl: 'upload-button.component.html',
  styleUrls: ['upload-button.component.scss']
})
export class UploadButton {
  /**
   * uploadState
   * 0 - initial, 1 - true, 2 - false
   * */
  private uploadState: number = 0;
  private error: string;
  private isLoading: boolean = false;
  @Output() imgUploaded: EventEmitter<string> = new EventEmitter();

  constructor() {}

  public handlePictureChange(event) {
    this.getBase64(event.target.files[0]);
  }

  public handleLoading = () => this.isLoading = true;

  public getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    if(reader.result.indexOf('data:image') >= 0) {
      this.uploadState = 1;
      this.isLoading = false;
      this.imgUploaded.emit(reader.result);
    }
    else {
      this.error = 'Chosen file is not an image';
      this.isLoading = false;
      this.uploadState = 2;
    }
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}
}
