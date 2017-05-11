import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})

export class MainNavigationComponent {
  constructor(private router: Router) {}

  public goToMain() {
  this.router.navigate(['']);
}
}
