import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../gallery.service';
import { IGalleryItem } from '../gallery.interface';

/**
 * Gallery list component
 */
@Component({
  selector: 'gallery-list',
  templateUrl: 'gallery-list.component.html',
  styleUrls: ['gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {

  public id: string;

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
      this.id = params['id'];
    });
    this.getGalleryItems();
  }

  public getGalleryItems() {
    this.galleryService.getGalleryItems()
      .subscribe((items: IGalleryItem) => {
        console.log('items');
        console.log(items);
      });
  };
}
