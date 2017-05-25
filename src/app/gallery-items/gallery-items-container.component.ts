import { Component, OnInit } from '@angular/core';
import { IActionState } from "../client/client.interface";

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
   * Handler gallery type changing
   *
   * @param {string} event
   * @return {void}
   */
  public onSortChanged(event) {
    console.log('onTypeChange');
    console.log(event);
  }
}
