import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Authentication } from 'adal-ts';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  /**
   * Process the redirect after login
   *
   * @returns {void}
   */
  public ngOnInit() {
    Authentication.getAadRedirectProcessor().process();
  }
}
