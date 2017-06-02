import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGalleryItem, IGalleryFilter } from '../../gallery/gallery-item.interface';
import { GalleryService } from '../../gallery/gallery.service';

/**
 * Gallery list component
 */
@Component({
  selector: 'gallery-item-list',
  templateUrl: 'gallery-item-list.component.html',
  styleUrls: ['gallery-item-list.component.scss']
})
export class GalleryItemListComponent {

  /**
   * Gallery id which has been opened
   *
   * @type {string}
   */
  public galleryId: number;

  /**
   * favorite/unfavorite event
   *
   * @type {EventEmitter}
   */
  @Output() public favorite: EventEmitter<IGalleryItem> = new EventEmitter();

  /**
   * Gallery items
   *
   * @type {IGalleryItem[]}
   */
  @Input() public galleryItems: IGalleryItem[];

  /**
   * Constructor
   *
   * @param {Route} route - ActivatedRoute
   * @returns {void}
   */
  constructor(private route: ActivatedRoute,
              private galleryService: GalleryService) {
  }

  /**
   * On favorite
   *
   * item {IGalleryItem} - gallery item
   * @returns {void}
   */
  public onFavorite(item: IGalleryItem) {
    this.favorite.emit(item);
  }
}
