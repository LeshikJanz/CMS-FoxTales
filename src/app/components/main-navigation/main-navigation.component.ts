import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})

export class MainNavigationComponent {
  constructor(private router: Router) {}

  @Input() user;
}
