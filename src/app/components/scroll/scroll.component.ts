import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'scroll',
  templateUrl: './scroll.component.html',
  styleUrls: [ './scroll.component.scss' ]
})

export class ScrollComponent implements OnInit {
  @Input() public options: string[];

  @Output() public chose: EventEmitter<string> = new EventEmitter<string>();

  public ngOnInit() {
    if (this.options == null) {
      throw new Error("Attribute 'options' is required");
    }
  }

  public onChose(elem: string) {
    console.log('onChose');
    this.chose.emit(elem)
  }
}
