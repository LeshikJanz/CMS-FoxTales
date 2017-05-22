import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Upload Button component
 */
@Component({
  selector: 'thumbnail',
  templateUrl: 'thumbnail.component.html',
  styleUrls: [ 'thumbnail.component.scss' ]
})
export class ThumbnailComponent {
  public uploadState: number = 0;
  public error: string;
  public isLoading: boolean = false;

  @Output() public imgUploaded: EventEmitter<string> = new EventEmitter();

  public handlePictureChange(event) {
    this.getBase64(event.target.files[ 0 ]);
  }

  public handleLoading = () => this.isLoading = true;

  public getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result.indexOf('data:image') >= 0) {
        this.uploadState = 1;
        this.isLoading = false;
        this.imgUploaded.emit(reader.result);
      }else {
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
