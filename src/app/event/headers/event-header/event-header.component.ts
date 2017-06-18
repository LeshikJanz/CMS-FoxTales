import { Component, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'event-header',
  templateUrl: 'event-header.component.html',
  styleUrls: ['event-header.component.scss']
})

export class EventHeaderComponent {
  constructor(private route: ActivatedRoute) {
  }

  public id: number;

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
}
