import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'radio',
  templateUrl: 'radio.component.html',
  styleUrls: [ 'radio.component.scss' ]
})

export class RadioComponent {
  @Input() public type:string = 'Bacon';

  @Output() public toggle:EventEmitter<string> = new EventEmitter<string>();

  onChange(value: string) {
    this.toggle.emit(value);
  }
}
