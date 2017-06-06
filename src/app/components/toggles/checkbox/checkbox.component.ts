import { Component, Output, EventEmitter, Input } from '@angular/core';

interface ICheckbox {
  name: string;
  isChecked: boolean;
}

@Component({
  selector: 'checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrls: ['checkbox.component.scss']
})

export class CheckboxComponent {
  @Output() public toggle: EventEmitter<ICheckbox> = new EventEmitter<ICheckbox>();

  @Input() public name: string;

  public isChecked: boolean;

  public onChange(event: boolean) {
    this.toggle.emit({ name: name, isChecked: event });
  }
}
