import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ISwitcher } from './switcher.interface';

@Component({
  selector: 'switcher',
  templateUrl: 'switcher.component.html',
  styleUrls: ['switcher.component.scss']
})

export class SwitcherComponent implements OnInit {
  @Input() public type: any;

  @Input() public options: ISwitcher[];

  @Output() public toggle: EventEmitter<ISwitcher> = new EventEmitter<ISwitcher>();

  @Input() public disabled: boolean;

  public ngOnInit() {
    if (!this.type) {
      this.type = this.options[1];
    }
  }

  public onChange(value: ISwitcher) {
    this.toggle.emit(value);
  }
}
