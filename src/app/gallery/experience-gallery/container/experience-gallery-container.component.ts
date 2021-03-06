import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { IActionState } from '../../../client/client.interface';
import { IGalleryItem, IGalleryFilter } from '../../gallery-item.interface';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../../gallery.service';
import { IExperience } from '../../../event/event.interface';

/**
 * Gallery list component
 */
@Component({
  selector: 'event-gallery-container',
  templateUrl: 'experience-gallery-container.component.html',
  styleUrls: ['experience-gallery-container.component.scss']
})
export class ExperienceGalleryContainerComponent implements OnInit {
  /**
   * Sort actions
   *
   * @type {IActionState[]}
   */
  public sortActions: IActionState[] = [
    { id: true, action: 'Upcoming' },
    { id: false, action: 'Descending' }
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

  public startDate: string;
  public endDate: string;

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

  /**
   * Handler gallery search
   *
   * @param {string} event
   * @return {void}
   */
  public onSortChanged(event) {
    this.filter.sortType = 0;
    this.filter.ascending = event.id;
    this.getGalleryItems(this.filter);
  }

  public onStartDateChanged(date: any) {
    this.filter.startFrom = moment(date).format();
    this.getGalleryItems(this.filter);
  }

  public onEndDateChanged(date: any) {
    this.filter.startTo = moment(date).format();
    this.getGalleryItems(this.filter);
  }

  public ngOnInit() {
    this.route.params.subscribe((params: any) =>
      this.experienceId = params['id']
    );

    this.filter = {experienceId: this.experienceId};
    this.getGalleryItems(this.filter);
  }

  /**
   * Get gallery items
   *
   * @param {IGalleryFilter} filter
   * @return {void}
   */
  public getGalleryItems(filter: IGalleryFilter) {
    this.galleryService.getGalleryItems(filter)
      .subscribe((items: IGalleryItem[]) =>
          this.galleryItems = items
      );
  }

  public onDelete(item: IGalleryItem) {
    this.getGalleryItems(this.filter);
  }

}
