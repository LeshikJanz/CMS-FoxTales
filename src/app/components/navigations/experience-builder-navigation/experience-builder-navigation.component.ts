import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'experience-builder-navigation',
  templateUrl: 'experience-builder-navigation.component.html',
  styleUrls: ['experience-builder-navigation.component.scss',
    '../../../shared/styles/navigation.scss']
})

export class ExperienceBuilderNavigationComponent implements OnInit, DoCheck {
  public location: any = '';
  public one: any;
  public two: any;
  public three: any;
  public four: any;
  public five: any;
  public six: any;
  public seven: any;
  constructor(private router: Router) {

  }

  public ngOnInit() {
    switch (this.router.url) {
      case '/experience-builder/container/basic-details':
        this.one = ' ';
        this.two = this.three = this.four = this.five = this.six = this.seven = null;
        break;
      case '/experience-builder/container/content-options':
        this.two = ' ';
        this.one = this.three = this.four = this.five = this.six = this.seven = null;
        break;
      case '/experience-builder/container/sharing-options':
        this.three = ' ';
        this.one = this.two = this.four = this.five = this.six = this.seven = null;
        break;
      case '/experience-builder/container/email-builder':
        this.four = ' ';
        this.one = this.three = this.two = this.five = this.six = this.seven = null;
        break;
      case '/experience-builder/container/ui-options':
        this.five = ' ';
        this.one = this.three = this.four = this.five = this.six = this.seven = null;
        break;
      case '/experience-builder/container/content-gallery':
        this.six = ' ';
        this.one = this.three = this.four = this.two = this.six = this.seven = null;
        break;
      case '/experience-builder/container/content-feeds':
        this.seven = ' ';
        this.one = this.three = this.four = this.five = this.six = this.two = null;
        break;
      default:
        this.one = ' ';
        this.two = this.three = this.four = this.five = this.six = this.seven = null;
    }
  }

  public ngDoCheck() {
    switch (this.router.url) {
      case '/experience-builder/container/basic-details':
        this.one = ' ';
        this.two = this.three = this.four = this.five = this.six = this.seven = null;
        break;
      case '/experience-builder/container/content-options':
        this.two = ' ';
        this.one = this.three = this.four = this.five = this.six = this.seven = null;
        break;
      case '/experience-builder/container/sharing-options':
        this.three = ' ';
        this.one = this.two = this.four = this.five = this.six = this.seven = null;
        break;
      case '/experience-builder/container/email-builder':
        this.four = ' ';
        this.one = this.three = this.two = this.five = this.six = this.seven = null;
        break;
      case '/experience-builder/container/ui-options':
        this.five = ' ';
        this.one = this.three = this.four = this.five = this.six = this.seven = null;
        break;
      case '/experience-builder/container/content-gallery':
        this.six = ' ';
        this.one = this.three = this.four = this.two = this.six = this.seven = null;
        break;
      case '/experience-builder/container/content-feeds':
        this.seven = ' ';
        this.one = this.three = this.four = this.five = this.six = this.two = null;
        break;
      default:
        this.one = ' ';
        this.two = this.three = this.four = this.five = this.six = this.seven = null;
    }
  }

}
