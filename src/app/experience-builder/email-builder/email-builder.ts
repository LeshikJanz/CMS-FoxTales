import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'email-builder',
  templateUrl: './email-builder.html'
})

export class EmailBuilderComponent {
  constructor(private router: Router) {}
}
