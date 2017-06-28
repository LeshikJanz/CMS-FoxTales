import { Component, Output, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IGalleryItem } from '../../gallery/gallery-item.interface';
import { GalleryService } from '../../gallery/gallery.service';
import hello from 'hellojs';
import 'rxjs/Rx' ;
import { ICheckbox } from '../toggles/checkbox/checkbox.component';

/**
 * Upload Button component
 */
@Component({
  selector: 'thumbnail',
  templateUrl: 'thumbnail.component.html',
  styleUrls: ['thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit {
  @ViewChild('shareModal')
  public shareModal: ModalDirective;

  public isChecked: boolean = false;

  public isInfoOpen: boolean = false;

  public selectedNetwork: string;

  public selectedMedia: IGalleryItem;

  @Input() public item: IGalleryItem;

  @Input() public title: string;

  @Input() public type: string;

  @Input() public progress: number = 0;

  @Output() public toggle: EventEmitter<ICheckbox> = new EventEmitter<ICheckbox>();

  @Output() public favorite: EventEmitter<IGalleryItem> = new EventEmitter();

  @Output() public visible: EventEmitter<IGalleryItem> = new EventEmitter();

  @Output() public deleted: EventEmitter<boolean> = new EventEmitter();

  @Output() public confirm: EventEmitter<any> = new EventEmitter();

  @Output() public decline: EventEmitter<any> = new EventEmitter();

  @Input() public isFavorite: boolean;

  constructor(private toastrService: ToastrService,
              private galleryService: GalleryService) {
  }

  public onPlayerReady(event) {
    console.log('onPlayerReady');
  }

  public onChecked(event) {
    event.id = this.item.id;
    this.toggle.emit(event);
  }

  public onConfirm() {
    this.confirm.emit();
  }

  public onDecline() {
    this.decline.emit();
  }

  public makeFavorite() {
    this.favorite.emit(this.item);
    this.item.favorite = !this.item.favorite;
    this.galleryService.makeFavorite(this.item.id, this.item.favorite)
      .subscribe(() => console.log('favorite is succeeded'));
  }

  public setVisibility() {
    this.visible.emit(this.item);
    this.item.visible = !this.item.visible;
    this.galleryService.setVisibility(this.item.id, this.item.visible)
      .subscribe(() => console.log('visibility is succeeded'));
  }

  public deleteMedia() {
    this.galleryService.deleteMedia(this.item.id)
      .subscribe(() => this.deleted.emit(true));
  }

  public downloadItem(item: IGalleryItem) {
    window.location.assign(item.mediaPath);
  }

  public ngOnInit() {
    if (this.title == null) {
      throw new Error("Attribute 'title' is required");
    }
    if (this.type == null) {
      throw new Error("Attribute 'type' is required");
    }
  }

  public selectMediaToShare(media: IGalleryItem, network: string): void {
    this.selectedMedia = media;
    this.selectedNetwork = network;
    this.shareModal.show();
  }

  /**
   * Share to social platforms
   *
   * @param {string} comment - Comment
   * @returns {void}
   */
  public share(comment: string): void {
    const social = hello(this.selectedNetwork);
    const isImage = /\.(jpe?g|gif|png)$/.test(this.selectedMedia.mediaPath);

    let tumblrRequest = {
      type: isImage ? 'photo' : 'video',
      caption: comment
    };

    if (isImage) {
      tumblrRequest['source'] = this.selectedMedia.mediaPath;
    } else {
      tumblrRequest['embed'] = `
        <video autoplay controls>
          <source src="${this.selectedMedia.mediaPath}" type="video/mp4">
        </video>
      `;
    }

    if ('tumblr' === this.selectedNetwork) {
      social
        .api('me')
        .then((response) => {
          const name = response['name'];

          social
            .api(`blog/${name}/post`, 'post', tumblrRequest)
            .then((successResponse) => {
              this.shareSuccessCallback(successResponse);
            }, (errorResponse) => {
              this.shareErrorCallback(errorResponse);
            });
        }, (errorResponse) => {
          this.shareErrorCallback(errorResponse);
        });
    } else {
      social
        .api('me/share', 'post', {
          message: comment,
          link: this.selectedMedia.mediaPath
        })
        .then((response) => {
          this.shareSuccessCallback(response);
        }, (response) => {
          this.shareErrorCallback(response);
        });
    }
  }

  /**
   * Share success callback
   *
   * @param {any} response - Response
   * @returns {void}
   */
  public shareSuccessCallback(response: any): void {
    if ('undefined' !== typeof response['error']
      || ('undefined' !== typeof response['errors'] && response['errors'].length)) {
      this.toastrService.error(`Unable to publish image.
       You are not authorized or token has been expired.`);
    } else {
      this.toastrService.success('Image has been published successfully.');
    }

    this.shareModal.hide();
  }

  /**
   * Share error callback
   *
   * @param {any} response - Response
   * @returns {void}
   */
  public shareErrorCallback(response: any): void {
    this.toastrService.error(`Unable to publish image.
     You are not authorized or token has been expired.`);
    this.shareModal.hide();
  }
}
