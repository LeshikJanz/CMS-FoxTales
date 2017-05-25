import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'email-builder',
  templateUrl: './email-builder.html'
})

export class EmailBuilderComponent {
   @ViewChild('staticTabs') staticTabs: TabsetComponent;
  constructor(private router: Router) {}
}
