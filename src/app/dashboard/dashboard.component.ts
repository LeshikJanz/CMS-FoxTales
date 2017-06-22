import { Component } from '@angular/core';

/**
 * Dashboard component
 */
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  public tags = [{
    id: 1, name: 'first'},
    {id: 2, name: 'firs'},
    {id: 3, name: 'firt'},
    {id: 4, name: 'fst'},
    {id: 5, name: 'irst'},
    {id: 6, name: 'fst'  }]

  public onSelect(event) {
      console.log('event');
      console.log(event);
  }
}
