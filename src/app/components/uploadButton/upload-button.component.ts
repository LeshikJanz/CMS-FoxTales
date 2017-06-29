import { Component, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { Http } from '@angular/http';

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

  @Output() public imgUploadedNon64: EventEmitter<any> = new EventEmitter();

  public maxFileSize: number = 2000000;

  constructor(private http: Http,
              private el: ElementRef) {
  }

  public set uploadStateValue(val: number) {
    this.uploadState = val;
    this.uploadStateChange.emit(this.uploadState);
  }

  public handlePictureChange(event) {
    this.getBase64(event.target.files[0]);
  }

  public handleLoading = () => this.isLoading = true;

  public showSizeError() {
      this.error = 'File size was too large (over 2MB)';
      this.isLoading = false;
      this.uploadStateValue = 2;
  }

  public getBase64(file) {
    let reader = new FileReader();
    if(file.size >= this.maxFileSize ) {
      this.showSizeError();
      return;
    }
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result.indexOf('data:image') >= 0|| this.filesAllowed) {
        this.uploadStateValue = 1;
        this.isLoading = false;
        this.imgUploaded.emit({ base64: reader.result, file: file });
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

  public upload() {
    let inputEl = this.el.nativeElement.children[0].firstElementChild;

    if (inputEl.files.length === 0) {
      return;
    }
    ;

    let files: FileList = inputEl.files;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    this.imgUploadedNon64.emit(formData)
    // this.http
    //     .post(`${process.env.API_URL}/MediaManipulations/37/assets`, formData)
    //     .subscribe((response) => console.log(response))

  }
}
