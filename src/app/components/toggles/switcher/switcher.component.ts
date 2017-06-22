import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ISwitcher } from './switcher.interface';

@Component({
  selector: 'switcher',
  templateUrl: 'switcher.component.html',
  styleUrls: ['switcher.component.scss']
})

export class SwitcherComponent implements OnInit {
  @Input() public type: number;

  @Input() public options: ISwitcher[];

  @Output() public toggle: EventEmitter<number> = new EventEmitter<number>();

  @Input() public disabled: boolean;

  public ngOnInit() {
    if (this.type) {
      this.onChange(this.type);
    }
  }

  public onChange(id: number) {
    this.toggle.emit(id);
  }
}
