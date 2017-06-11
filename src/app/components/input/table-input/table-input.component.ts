import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { ICol } from '../../../shared/table/col.interface';

@Component({
  selector: 'table-input',
  templateUrl: 'table-input.component.html',
  styleUrls: ['table-input.component.scss']
})

export class TableInputComponent {
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
