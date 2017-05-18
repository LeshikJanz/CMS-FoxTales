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

  /**
   * Method choose uniq array elements
   *
   * @return {string[]}
   * */
  public unique(arr: string[]) {
    const obj = {};

      arr.forEach((a, i) => {
        const str = a[i];
        obj[str] = true;
      });

    return Object.keys(obj);
  }

  public onChose(elem: string) {
    console.log(elem);
    this.selectedItems.push(elem);
    this.chose.emit(this.selectedItems);
  }
}
