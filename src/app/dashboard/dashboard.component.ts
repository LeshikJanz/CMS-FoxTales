import { Component } from '@angular/core';

/**
 * Dashboard component
 */
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  public options1 = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ]

  public options2 = [
    { id: 4, name: 'Option 4' },
    { id: 5, name: 'Option 5' },
    { id: 6, name: 'Option 6' },
  ]

  public onSwitch1(event) {
      console.log('onSwitch1');
      console.log(event);
  }

  public onSwitch2(event) {
      console.log('onSwitch2');
      console.log(event);
  }
}
