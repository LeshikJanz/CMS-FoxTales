import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { IActionState } from '../../../client/client.interface';
import { IGalleryItem, IGalleryFilter } from '../../gallery-item.interface';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../../gallery.service';
import { ExperienceService } from '../../../experience/experience.service';
import { IExperience, IEventGallery } from '../../../event/event.interface';
import { EventService } from '../../../event/event.service';
import { ISwitcher } from '../../../components/toggles/switcher/switcher.interface';
import { ICheckbox } from '../../../components/toggles/checkbox/checkbox.component';

/**
 * Gallery list component
 */
@Component({
  selector: 'event-gallery-container',
  templateUrl: 'event-gallery-container.component.html',
  styleUrls: ['event-gallery-container.component.scss']
})
export class EventGalleryContainerComponent implements OnInit {
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
  public galleryTypes: ISwitcher[] = [
    { id: 1, name: 'Event' },
    { id: 2, name: 'Experiences' },
    { id: 3, name: 'All' }];

  /**
   * Selected gallery type
   *
   * @type {string}
   */
  public selectedType: number = this.galleryTypes[1].id;  // Experience

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
   * Current event id
   *
   * @type {number}
   */
  public eventId: number;

  /**
   * Search value
   *
   * @type {string}
   */
  public search: string;

  /**
   * Current event gallery properties
   *
   * @type {IEventGallery}
   */
  public eventGallery: IEventGallery;

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
              private experienceService: ExperienceService,
              private galleryService: GalleryService,
              private eventService: EventService) {
  }

  /**
   * Handler gallery type changing
   *
   * @param {number} event
   * @return {void}
   */
  public onTypeChange(event) {
    this.selectedType = event;
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
    this.route.params.subscribe((params: any) => {
        this.eventId = params['id'];
        console.log('this.eventId');
        console.log(this.eventId);
      }
    );

    this.filter = { eventId: this.eventId };

    this.getGalleryItems(this.filter);
    this.getExperiences(this.eventId);
    this.getEventGallery(this.eventId);
  }

  /**
   * Get experience
   *
   * @param {number} id
   * @return {void}
   */
  public getExperiences(id: number) {
    this.experienceService.getExperiences(id)
      .subscribe((experiences: IExperience[]) =>
        this.experiences = experiences
      );
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

  public onDelete(item: IGalleryItem) {
    this.getGalleryItems(this.filter);
  }

  /**
   * Get event gallery background properties
   *
   * @param {number} eventId
   * @return {void}
   */
  public getEventGallery(eventId: number) {
    this.eventService.getEventGallery(eventId)
      .subscribe((gallery: IEventGallery) =>
        this.eventGallery = gallery
      );
  }

  /**
   * Get gallery items
   *
   * @param {IGalleryFilter} filter
   * @return {void}
   */
  public getGalleryItems(filter: IGalleryFilter): EventGalleryContainerComponent {
    this.galleryService.getGalleryItems(filter)
      .subscribe((items: IGalleryItem[]) =>
        this.galleryItems = items
      );

    return this;
  };
}
