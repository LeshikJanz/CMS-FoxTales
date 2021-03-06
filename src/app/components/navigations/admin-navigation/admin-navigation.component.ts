import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteData } from '../../../shared/core/event-management/route-data.service';
import { IActionState } from '../../../client/client.interface';
import { NavigationService } from "../../../shared/core/navigation/navigation.service";

@Component({
  selector: 'admin-navigation',
  templateUrl: 'admin-navigation.component.html',
  styleUrls: ['admin-navigation.component.scss']
})

export class AdminNavigationComponent {
  public isArchieved: boolean = false;

  public id: number;

  /**
   * Archieve states
   *
   * @type {IActionState[]}
   */
  public clientStates: IActionState[] = [
    { id: 1, action: 'Unarchived' },
    { id: 2, action: 'Archived' }
  ];

  constructor(private nav: NavigationService,
              private routeData: RouteData,
              private route: ActivatedRoute) {
    this.route.firstChild.params.subscribe((params) =>
      this.id = params['id']
    )
  }

  public onTypeChanged(id: number) {
    this.isArchieved = !this.isArchieved;
    this.routeData.archieve.next(id);
  }
}
