import { Component, OnChanges, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'switcher',
  templateUrl: 'switcher.component.html',
  styleUrls: [ 'switcher.component.scss' ]
})

export class SwitcherComponent implements OnInit {
  @Input() public type:string;

  @Input() public options: string[];

  @Output() public toggle:EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.type = this.options[0];
  }

  onChange(value: string) {
    this.toggle.emit(value);
  }
}
