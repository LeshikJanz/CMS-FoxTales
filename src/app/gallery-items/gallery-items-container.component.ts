import { Component, OnInit } from '@angular/core';
import { IActionState } from "../client/client.interface";
import { ActivatedRoute } from "@angular/router";
import { GalleryService } from "../gallery/gallery.service";

/**
 * Gallery list component
 */
@Component({
  selector: 'gallery-items-container',
  templateUrl: 'gallery-items-container.component.html',
  styleUrls: ['gallery-items-container.component.scss']
})
export class GalleryItemsContainerComponent {
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
   * @type {string}
   */
  public galleryId: string;

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
    this.route.params.subscribe((params: any) => {
      this.galleryId = params['id'];
    });
  }
}
