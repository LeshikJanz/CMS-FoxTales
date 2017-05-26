import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { IGalleryItem } from '../../gallery/gallery-item.interface';
import { GalleryService } from '../../gallery/gallery.service';

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

  @Output() public confirm: EventEmitter<any> = new EventEmitter();

  @Output() public decline: EventEmitter<any> = new EventEmitter();

  @Input() public isFavorite: boolean;

  constructor(private galleryService: GalleryService) {}

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
    this.isFavorite = !this.isFavorite;
    this.galleryService.makeFavorite(this.item.id, this.isFavorite)
      .subscribe(() => console.log('favorite is succeeded'))
  }

  public ngOnInit() {
    if (this.title == null) {
      throw new Error("Attribute 'title' is required");
    }
    if (this.type == null) {
      throw new Error("Attribute 'type' is required");
    }
  }
}
