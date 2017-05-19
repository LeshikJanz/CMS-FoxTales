import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'radio',
  templateUrl: 'radio.component.html',
  styleUrls: ['radio.component.scss']
})

export class RadioComponent {
  @Input() public type: string = 'Bacon';

  @Input() public options: string[];

  @Output() public toggle: EventEmitter<string> = new EventEmitter<string>();

  public onChange(value: string) {
    this.toggle.emit(value);
  }
}
