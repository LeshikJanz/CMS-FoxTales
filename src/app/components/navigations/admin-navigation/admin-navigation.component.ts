import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouteData } from '../../../shared/core/event-management/route-data.service';
import { IActionState } from '../../../client/client.interface';

@Component({
  selector: 'admin-navigation',
  templateUrl: 'admin-navigation.component.html',
  styleUrls: ['admin-navigation.component.scss',
    '../../../shared/styles/navigation.scss']
})

export class AdminNavigationComponent {
  public curLocation: string;

  public isArchieved: boolean = false;

  /**
   * Archieve states
   *
   * @type {IActionState[]}
   */
  public clientStates: IActionState[] = [
    {id: 1, action: 'Unarchived'},
    {id: 2, action: 'Archived'}
  ];

  constructor(private location: Location,
              private router: Router,
              private routeData: RouteData) {
    this.router.events.subscribe((val) =>
      this.curLocation = this.location.path()
    );
  }

  public onTypeChanged(id: number) {
    this.isArchieved = !this.isArchieved;
    this.routeData.archieve.next(id);
  }
}
