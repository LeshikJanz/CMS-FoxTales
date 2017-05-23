import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

/**
 * Gallery list component
 */
@Component({
  selector: 'gallery-list',
  templateUrl: 'gallery-list.component.html',
  styleUrls: ['gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {
  /**
   * Constructor
   *
   * @param {Route} route - ActivatedRoute
   * @returns {void}
   */
  constructor(private route: ActivatedRoute) {}

  public id: string;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
}
