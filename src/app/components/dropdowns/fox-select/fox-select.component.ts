import { Component, ViewEncapsulation, Output, EventEmitter, Input, OnInit, OnChanges } from '@angular/core';
import { IClient } from "../../../client/client.interface";

@Component({
  selector: 'fox-select',
  templateUrl: 'fox-select.component.html',
  styleUrls: ['fox-select.component.scss']
})
export class FoxSelectComponent implements OnChanges {
  @Output() change: EventEmitter<any> = new EventEmitter();

  @Input() public items:Array<any>;

  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    console.log('Selected value is: ', value);
    this.change.emit(value);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

  public ngOnChanges() {
    if (this.items) {
      this.items = this.items.map((c: IClient) => (<any>c).text = c.name);
    }
  }
}
