import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'switcher',
  templateUrl: 'switcher.component.html',
  styleUrls: ['switcher.component.scss']
})

export class SwitcherComponent implements OnInit {
  @Input() public type: string;

  @Input() public options: any[];

  @Output() public toggle: EventEmitter<string> = new EventEmitter<string>();

  @Input() public disabled: boolean;

  public ngOnInit() {
    if (!this.type) {
      this.type = this.options[1];
    }
  }

  public onChange(value: any) {
    this.toggle.emit(value);
  }
}
