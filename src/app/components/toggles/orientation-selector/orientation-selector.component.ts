import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'orientation-selector',
  templateUrl: 'orientation-selector.component.html',
  styleUrls: ['orientation-selector.component.scss']
})

export class OrientationSelectorComponent {
  @Input() public type: string;

  @Input() public options: string[];

  @Output() public toggle: EventEmitter<string> = new EventEmitter<string>();

  public onChange(value: string) {
    this.toggle.emit(value);
  }
}
