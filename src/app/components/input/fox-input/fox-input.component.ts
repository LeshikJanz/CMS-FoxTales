import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'fox-input',
  templateUrl: 'fox-input.component.html',
  styleUrls: ['fox-input.component.scss']
})

export class FoxInputComponent {
  @Input() public title = '';

  @Output() public Change: EventEmitter<string> = new EventEmitter<string>();

  public value: string = null;

  public onChange(value: string) {
    this.Change.emit(value);
  }
}
