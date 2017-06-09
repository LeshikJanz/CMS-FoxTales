import { Component, Output, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IGalleryItem } from '../../gallery/gallery-item.interface';
import { GalleryService } from '../../gallery/gallery.service';
import hello from 'hellojs';
import 'rxjs/Rx' ;

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

  @Output() public toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() public favorite: EventEmitter<IGalleryItem> = new EventEmitter();

  @Output() public confirm: EventEmitter<any> = new EventEmitter();

  @Output() public decline: EventEmitter<any> = new EventEmitter();

  @Input() public isFavorite: boolean;

  constructor(
    private toastrService: ToastrService,
    private galleryService: GalleryService
  ) {
  }

  public onPlayerReady(event) {
    console.log('onPlayerReady');
  }

  public onChecked(event) {
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

  public downloadItem(item: IGalleryItem) {
    const win = window.open(item.mediaPath, '_blank');
    win.focus();
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

    if ('tumblr' === this.selectedNetwork) {
      social
        .api('me')
        .then((response) => {
          const name = response['name'];

          social
            .api(`blog/${name}/post`, 'post', {
              type: 'photo',
              caption: comment,
              source: this.selectedMedia.mediaPath
            })
            .then(this.shareSuccessCallback, this.shareErrorCallback);
        });
    } else {
      social
        .api('me/share', 'post', {
          message: comment,
          link: this.selectedMedia.mediaPath
        })
        .then(this.shareSuccessCallback, this.shareErrorCallback);
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
      this.toastrService.error(`Unable to publish image.`);
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
    this.toastrService.error(`Unable to publish image. ${response.error.message}`);
    this.shareModal.hide();
  }
}
