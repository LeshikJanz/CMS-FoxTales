import { Component, Input } from '@angular/core';

@Component({
  selector: 'event-tag',
  templateUrl: 'event-tag.component.html',
  styleUrls: [ 'event-tag.component.scss' ]
})

export class EventTagComponent {
  @Input() title = '';
}
