import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionState } from '../../client/client.interface';
import { IGalleryItem, IGalleryFilter } from '../gallery-item.interface';
import { IExperience } from '../../event/event.interface';
import { GalleryService } from '../gallery.service';
import { RouteData } from '../../shared/core/event-management/route-data.service';
import { ICheckbox } from '../../components/toggles/checkbox/checkbox.component';
import { IUserClient } from '../../user/user-client.interface';
import { UserService } from '../../user/user.service';
import { IUserEvent } from '../../event/event.interface';
import { EventService } from '../../event/event.service';
import { ExperienceService } from '../../experience/experience.service';
import * as moment from 'moment';

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
    { id: true, action: 'Most Shared' },
    { id: false, action: 'Least Shared' }
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
  public filter: IGalleryFilter = {
    favoriteOnly: true
  };

  /**
   * Clients
   *
   * @type {IUserClient[]}
   */
  public clients: IUserClient[];

  public events: IUserEvent[];

  public eventExperiences: IUserEvent[];

  public createdDate: string = '';

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
              private _routeData: RouteData,
              private userService: UserService,
              private eventService: EventService,
              private experienceService: ExperienceService
  ) {
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
    this.filter.sortType = 1;
    this.filter.ascending = event.id;
    this.getGalleryItems(this.filter);
  }

  public ngOnInit() {
    this.route.params.subscribe((params: any) =>
      this.experienceId = params['id']
    );

    this.getGalleryItems(this.filter);
    this.getUserClients();
    this.getUserEvents();
  }

  /**
   * Get user clients
   *
   * @returns {FavoriteGalleryComponent} - Component
   */
  public getUserClients(): FavoriteGalleryComponent {
    this.userService
      .getClients()
      .subscribe((clients: IUserClient[]) => {
        this.clients = clients;
      });

    return this;
  }

  /**
   * Get user events
   *
   * @returns {FavoriteGalleryComponent} - Component
   */
  public getUserEvents(): FavoriteGalleryComponent {
    this.eventService
      .getEvents()
      .subscribe((events: IUserEvent[]) => {
        this.events = events;
      });

    return this;
  }

  /**
   * Get user experiences
   *
   * @returns {FavoriteGalleryComponent} - Component
   */
  public getUserExperiences(): FavoriteGalleryComponent {
    this.eventExperiences = [];
    delete this.filter.experienceId;

    this.experienceService
      .getExperiences(this.filter.eventId)
      .subscribe((experiences: IUserEvent[]) => {
        this.eventExperiences = experiences;
      });

    return this;
  }

  public onClientSelected(event): void {
    this.filter.clientId = event.id;
    this.getGalleryItems(this.filter);
  }

  public onEventSelected(event): void {
    this.filter.eventId = event.id;
    this.getUserExperiences();
    this.getGalleryItems(this.filter);
  }

  public onExperienceSelected(event): void {
    this.filter.experienceId = event.id;
    this.getGalleryItems(this.filter);
  }

  public onCreatedDateChanged(date: any) {
    date = moment(date).format();

    this.filter.startFrom = date;
    this.filter.startTo = date;
    this.getGalleryItems(this.filter);
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
