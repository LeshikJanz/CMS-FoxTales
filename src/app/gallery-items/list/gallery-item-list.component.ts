import { Component, OnInit } from '@angular/core';
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
export class GalleryItemListComponent implements OnInit {

  /**
   * Gallery id which has been opened
   *
   * @type {string}
   */
  public galleryId: number;

  /**
   * Gallery filter
   *
   * @type {IGalleryFilter}
   */
  public filter:IGalleryFilter;

  /**
   * Gallery items
   *
   * @type {IGalleryItem[]}
   */
  public galleryItems: IGalleryItem[];

  /**
   * Constructor
   *
   * @param {Route} route - ActivatedRoute
   * @returns {void}
   */
  constructor(private route: ActivatedRoute,
              private galleryService: GalleryService) {
  }

  public ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.galleryId = params['id'];
    });

    this.filter = {experienceId: this.galleryId}
    this.getGalleryItems(this.filter);
  }

  public getGalleryItems(filter: IGalleryFilter) {
    this.galleryService.getGalleryItems(filter)
      .subscribe((items: IGalleryItem[]) => {
        this.galleryItems = items;
      });
  };
}
