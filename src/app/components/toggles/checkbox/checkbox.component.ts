import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

export interface ICheckbox {
  name: string;
  isChecked: boolean;
}

@Component({
  selector: 'checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrls: ['checkbox.component.scss']
})

export class CheckboxComponent implements OnInit {
  @Output() public toggle: EventEmitter<ICheckbox> = new EventEmitter<ICheckbox>();

  @Input() public name: string;

  public isChecked: boolean = false;

  public checkbox: ICheckbox;

  public onChange(event: boolean) {
    this.toggle.emit({ name: name, isChecked: event });
  }

  ngOnInit() {
    this.toggle.emit({ name: name, isChecked: this.isChecked });
  }
}
