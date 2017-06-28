import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { IClient } from '../../../client/client.interface';

@Component({
  selector: 'fox-select',
  templateUrl: 'fox-select.component.html',
  styleUrls: ['fox-select.component.scss']
})
export class FoxSelectComponent implements OnChanges {
  @Output() public change: EventEmitter<any> = new EventEmitter();

  @Output() public data: EventEmitter<any> = new EventEmitter();

  @Input() public items: any[];

  @Input() public active: any;

  @Input() public multiple: boolean = false;

  public activeItems: any[] = [];

  @Input() public disabled: boolean = false;

  private value: any = {};

  private _disabledV: string = '0';

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    this.change.emit(value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
    this.data.emit(value);
  }

  public convert(items: any) {
    return items.map((c: any) => ({
      ...c,
      text: c.name
    }));
  }

  public findActiveItems() {
    if (this.multiple) {
      Object.assign(this.activeItems, this.convert(this.active));
    } else {
      this.activeItems = this.convert([this.active]);
    }
    this.active = null;
  }

  public ngOnChanges() {
    if (this.items) {
      this.items = this.convert(this.items);
    }

    if (this.active && this.active.name) {
      this.findActiveItems();
      this.change.emit(this.activeItems[0]);
    }
  }
}
