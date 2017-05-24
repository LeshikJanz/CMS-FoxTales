import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


/**
 * Gallery list component
 */
@Component({
  selector: 'gallery-list',
  templateUrl: 'gallery-list.component.html',
  styleUrls: ['gallery-list.component.scss']
})
export class GalleryListComponent {

  public galleries: any[] = [1, 2, 3];

  public curLocation: string;

  /**
   * Constructor
   *
   * @param {Route} route - ActivatedRoute
   * @returns {void}
   */
  constructor(private location: Location,
              private router: Router) {
    this.router.events.subscribe((val) =>{
      this.curLocation = this.location.path();
    });
  }
}
