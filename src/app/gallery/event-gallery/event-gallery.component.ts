import { Component, OnInit, Input } from '@angular/core';
import { IActionState } from '../../client/client.interface';
import { IGalleryItem, IGalleryFilter } from '../gallery-item.interface';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../gallery.service';


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
   * Gallery types
   *
   * @type {string[]}
   */
  public galleryTypes: string[] = ['Event', 'Experience', 'All'];


  /**
   * Gallery items
   *
   * @type {IGalleryItem[]}
   */
  @Input() public galleryItems: IGalleryItem[];

  /**
   * Current event id
   *
   * @type {string}
   */
  public eventId: string;

  /**
   * Constructor
   *
   * @param {Route} route - ActivatedRoute
   * @param {GalleryService} galleryService - Gallery service
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
  public onTypeChange(event) {
    console.log('onTypeChange');
    console.log(event);
  }

  /**
   * Handler gallery search
   *
   * @param {string} event
   * @return {void}
   */
  public onSearchChange(event) {
    console.log('onSearchChange');
    console.log(event);
  }

  public ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.eventId = params['id'];
      console.log('this.eventId');
      console.log(this.eventId);
    });

    const filter = { eventId: +this.eventId }
    this.getGalleryItems(filter);
  }

  public getGalleryItems(filter: IGalleryFilter) {
    this.galleryService.getGalleryItems(filter)
      .subscribe((items: IGalleryItem[]) => {
        this.galleryItems = items;
      });
  };
}
