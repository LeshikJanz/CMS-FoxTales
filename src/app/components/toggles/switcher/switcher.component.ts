import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'switcher',
  templateUrl: 'switcher.component.html',
  styleUrls: [ 'switcher.component.scss' ]
})

export class SwitcherComponent {
  @Input() public type:string = 'Bacon';

  @Input() public options: string[];

  @Output() public toggle:EventEmitter<string> = new EventEmitter<string>();

  onChange(value: string) {
    this.toggle.emit(value);
  }
}
