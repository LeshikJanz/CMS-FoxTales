import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'scroll',
  templateUrl: './scroll.component.html',
  styleUrls: [ './scroll.component.scss' ]
})

export class ScrollComponent implements OnInit {
  @Input() public options: string[];

  @Output() public chose: EventEmitter<string[]> = new EventEmitter();
  public selectedItems: string[] = [];

  public ngOnInit() {
    if (this.options == null) {
      throw new Error("Attribute 'options' is required");
    }
  }

  public onChose(elem: string) {
    this.selectedItems.find(item => item === elem) ?
      this.selectedItems = this.selectedItems.filter(item => item != elem)
      : this.selectedItems.push(elem);
    this.chose.emit(this.selectedItems);
  }
}
