import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'basic-details',
  templateUrl: './basic-details.html'
})

export class BasicDetailsComponent {
  constructor(private router: Router) {}
}
