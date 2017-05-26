import { Component, OnInit, Input } from '@angular/core';
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

  @Input() public galleries: any[];

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
