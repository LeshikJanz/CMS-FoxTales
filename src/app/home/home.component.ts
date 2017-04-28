import { Component } from '@angular/core';
import { AppState } from '../app.service';

/**
 * Home page component
 */
@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(public appState: AppState) {
  }
}
