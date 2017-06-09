import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'search-input',
  templateUrl: 'search-input.component.html',
  styleUrls: ['search-input.component.scss']
})

export class SearchInputComponent {
  @Input() public title = '';

  @Output() public Change: EventEmitter<string> = new EventEmitter<string>();

  public value: string = null;

  public onChange(value: string) {
    this.Change.emit(value);
  }
}
