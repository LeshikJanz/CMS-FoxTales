import { Component } from '@angular/core';
import { RouteData } from '../shared/core/routing/route-data.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html'
})

export class AdminComponent {
  constructor(private _routeData: RouteData) {
    // _routeData.name.next('Admin Management');
  }
}
