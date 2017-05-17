import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-builder',
  templateUrl: './ui-builder.html'
})

export class UIBuilderComponent {
  constructor(private router: Router) {}
}
