import { Component, OnInit, Input } from '@angular/core';
import { IActionState } from '../../../client/client.interface';
import { IGalleryItem, IGalleryFilter } from '../../gallery-item.interface';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../../gallery.service';
import { ExperienceService } from '../../../experience/experience.service';
import { IExperience, IEventGallery } from '../../../event/event.interface';
import { EventService } from '../../../event/event.service';

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
   * Selected gallery type
   *
   * @type {string}
   */
  public selectedType: string = 'Experiences';
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
   * @param {string} event
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
    console.log('onSortChange');
    console.log(event);
  }

  public ngOnInit() {
    this.route.params.subscribe((params: any) =>
      this.eventId = params['id']
    );

    this.filter = {eventId: this.eventId};

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
   * Get event gallery background properties
   *
   * @param {number} eventId
   * @return {void}
   */
  public getEventGallery(eventId: number) {
    this.eventService.getEventGallery(eventId)
      .subscribe((gallery: IEventGallery) => {
        this.eventGallery = gallery;
        console.log('this.eventGallery');
        console.log(this.eventGallery);
      });
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
