import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrls: [ 'checkbox.component.scss' ]
})

export class CheckboxComponent {
  @Output() public toggle: EventEmitter<string> = new EventEmitter<string>();

  public isChecked: boolean;

  public onChange(value: string) {
    this.toggle.emit(value);
  }
}
