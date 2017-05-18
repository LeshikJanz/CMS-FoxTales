import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'scroll',
  templateUrl: './scroll.component.html',
  styleUrls: [ './scroll.component.scss' ]
})

export class ScrollComponent implements OnInit {
  @Input() public options: string[];

  @Output() public chose: EventEmitter<string> = new EventEmitter();

  public ngOnInit() {
    if (this.options == null) {
      throw new Error("Attribute 'options' is required");
    }
  }

  public onChose(elem: string) {
    this.chose.emit(elem);
  }
}
