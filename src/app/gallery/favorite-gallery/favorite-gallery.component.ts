import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionState } from '../../client/client.interface';
import { IGalleryItem, IGalleryFilter } from '../gallery-item.interface';
import { IExperience } from '../../event/event.interface';
import { GalleryService } from '../gallery.service';
import { RouteData } from '../../shared/core/event-management/route-data.service';
import { ICheckbox } from '../../components/toggles/checkbox/checkbox.component';

/**
 * Favorite gallery component
 */
@Component({
  selector: 'favorite-gallery',
  templateUrl: 'favorite-gallery.component.html',
  styleUrls: ['favorite-gallery.component.scss']
})
export class FavoriteGalleryComponent implements OnInit {
  /**
   * Sort actions
   *
   * @type {IActionState[]}
   */
  public sortActions: IActionState[] = [
    {id: 1, action: 'Upcoming'},
    {id: 2, action: 'Descending'}
  ];

  /**
   * Gallery types
   *
   * @type {string[]}
   */
  public galleryTypes: string[] = ['Event', 'Experiences', 'All'];

  /**
   * Gallery items
   *
   * @type {IGalleryItem[]}
   */
  @Input() public galleryItems: IGalleryItem[];
  /**
   * Experience items
   *
   * @type {IExperience[]}
   */
  @Input() public experiences: IExperience[];

  /**
   * Current experience id
   *
   * @type {number}
   */
  public experienceId: number;

  /**
   * Search value
   *
   * @type {string}
   */
  public search: string;

  /**
   * Gallery filter
   *
   * @type {IGalleryFilter}
   */
  public filter: IGalleryFilter;

  /**
   * Constructor
   *
   * @param {Route} route - ActivatedRoute
   * @param {GalleryService} galleryService - Gallery service
   * @param _routeData
   * @returns {void}
   */
  constructor(private route: ActivatedRoute,
              private galleryService: GalleryService,
              private _routeData: RouteData) {
    // _routeData.name.next('Favorited Media');
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

  /**
   * Handler sort action
   *
   * @param {string} event
   * @return {void}
   */
  public onSortChanged(event) {
    console.log('onSortChange');
    console.log(event);
  }

  public ngOnInit() {
    this.route.params.subscribe((params: any) =>
      this.experienceId = params['id']
    );

    this.getGalleryItems({favoriteOnly: true});
  }

  /**
   * Hide item from gallery if it was favorited
   *
   * item {IGalleryItem} - gallery item
   * @returns {void}
   */
  public onFavorite(item: IGalleryItem) {
    this.galleryItems = this.galleryItems.filter((gItem: IGalleryItem) => gItem !== item);
  }

  public onDelete(item: IGalleryItem) {
    this.getGalleryItems(this.filter);
  }

  /**
   * Mark element as checked/unchecked
   *
   * item {ICheckbox} - checkbox element
   * @returns {void}
   */
  public onChecked(event: ICheckbox) {
    this.galleryItems.filter((i: IGalleryItem) => i.id === event.id)[0]
      .isChecked = event.isChecked;
  }

  /**
   * Get gallery items
   *
   * @param {IGalleryFilter} filter
   * @return {void}
   */
  public getGalleryItems(filter: IGalleryFilter = {}) {
    this.galleryService.getGalleryItems(filter)
      .subscribe((items: IGalleryItem[]) =>
        this.galleryItems = items
      );
  };
}
