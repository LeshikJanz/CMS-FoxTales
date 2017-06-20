import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

export interface ICheckbox {
  id?: number;
  name?: string;
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

  @Input() public isChecked: boolean = false;

  public checkbox: ICheckbox;

  public onChange(event: boolean) {
    this.toggle.emit({name: this.name, isChecked: event});
  }

  public ngOnInit() {
    this.toggle.emit({name, isChecked: this.isChecked});
  }
}
