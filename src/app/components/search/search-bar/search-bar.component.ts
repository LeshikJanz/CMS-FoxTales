import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: 'search-bar.component.html',
  styleUrls: ['search-bar.component.scss']
})

export class SearchBarComponent {
  @Output() public Change: EventEmitter<string> = new EventEmitter<string>();

  public value: string = null;

  public onChange(value: string) {
    this.Change.emit(value);
  }
}
