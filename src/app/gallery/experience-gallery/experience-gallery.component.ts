import { Component, OnInit } from '@angular/core';
import { IActionState } from '../../client/client.interface';


/**
 * Gallery list component
 */
@Component({
  selector: 'experience-gallery',
  templateUrl: 'experience-gallery.component.html',
  styleUrls: ['experience-gallery.component.scss']
})
export class ExperienceGalleryComponent {
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
}
