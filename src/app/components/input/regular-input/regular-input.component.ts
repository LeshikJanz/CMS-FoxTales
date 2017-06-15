import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { ICol } from '../../../shared/table/col.interface';

@Component({
  selector: 'regular-input',
  templateUrl: 'regular-input.component.html',
  styleUrls: ['regular-input.component.scss']
})

export class RegularInputComponent {
  @Input() public title = '';

  @Input() public col: ICol;

  @Output() public Change: EventEmitter<string> = new EventEmitter<string>();

  @Output() public sortChange: EventEmitter<ICol> = new EventEmitter<ICol>();

  public value: string = null;

  public onSortChange(event: ICol) {
    this.sortChange.emit(event);
  }

  public onChange(value: string) {
    this.Change.emit(value);
  }
}
