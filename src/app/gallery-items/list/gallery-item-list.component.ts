import { Component, OnInit, Input } from '@angular/core';
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
}
