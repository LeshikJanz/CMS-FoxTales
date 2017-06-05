import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  styleUrls: [ 'thumbnail.component.scss' ]
})
export class ThumbnailComponent implements OnInit {
  public isChecked: boolean = false;

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
    event.play();
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

  /**
   * Share to social platforms
   *
   * @param {IGalleryItem} item - Gallery item
   * @param {string} network - Social network name
   * @returns {void}
   */
  public share(item: IGalleryItem, network: string): void {
    const social = hello(network);

    social.login({force: false}, () => {
      social.api('me/share', 'post', {
        message: '',
        link: item.mediaPath
      }).then(() => {
        this.toastrService.success('Image has been published successfully.');
      }, (r) => {
        this.toastrService.error(`Unable to publish image. ${r.error.message}`);
      });
    });
  }
}
