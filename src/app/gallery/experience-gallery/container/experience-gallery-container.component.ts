import { Component, OnInit, Input } from '@angular/core';
import { IActionState } from '../../../client/client.interface';
import { IGalleryItem, IGalleryFilter } from '../../gallery-item.interface';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../../gallery.service';
import { ExperienceService } from '../../../experience/experience.service';
import { IExperience } from "../../../event/event.interface";


/**
 * Gallery list component
 */
@Component({
  selector: 'event-gallery-container',
  templateUrl: 'experience-gallery-container.component.html',
  styleUrls: ['experience-gallery-container.component.scss']
})
export class ExperienceGalleryContainerComponent {
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
  public galleryTypes: string[] = ['Event', 'Experience', 'All'];

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
   * Gallery filter
   *
   * @type {IGalleryFilter}
   */
  public filter:IGalleryFilter;

  /**
   * Constructor
   *
   * @param {Route} route - ActivatedRoute
   * @param {GalleryService} galleryService - Gallery service
   * @returns {void}
   */
  constructor(private route: ActivatedRoute,
              private experienceService: ExperienceService,
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
    this.route.params.subscribe((params: any) =>
      this.experienceId = params['id']
  );

    this.filter = {experienceId: this.experienceId}
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
  };
}
