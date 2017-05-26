import { Component, OnInit } from '@angular/core';
import { IActionState } from "../../../client/client.interface";
import { ActivatedRoute } from "@angular/router";
import { GalleryService } from "../../gallery.service";
import { IGalleryFilter, IGalleryItem } from "../../gallery-item.interface";

/**
 * Gallery list component
 */
@Component({
  selector: 'event-gallery',
  templateUrl: 'event-gallery.component.html',
  styleUrls: ['event-gallery.component.scss']
})
export class EventGalleryComponent {
  /**
   * Sort actions
   *
   * @type {IActionState[]}
   */
  public sortActions: IActionState[] = [
    { id: 1, action: 'Upcoming' },
    { id: 2, action: 'Descending' }
  ];

  /**
   * Gallery id which has been opened
   *
   * @type {number}
   */
  public galleryId: number;

  /**
   * Gallery filter
   *
   * @type {IGalleryFilter}
   */
  public filter: IGalleryFilter;

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

  /**
   * Handler gallery type changing
   *
   * @param {string} event
   * @return {void}
   */
  public onSortChanged(event) {
    console.log('onTypeChange');
    console.log(event);
  }

  public ngOnInit() {
    this.route.params.subscribe((params: any) =>
      this.galleryId = params['id']
  );

    this.filter = {experienceId: this.galleryId};
    this.getGalleryItems(this.filter);
  }

  public getGalleryItems(filter: IGalleryFilter) {
    this.galleryService.getGalleryItems(filter)
      .subscribe((items: IGalleryItem[]) => {
        this.galleryItems = items;
      });
  };
}
