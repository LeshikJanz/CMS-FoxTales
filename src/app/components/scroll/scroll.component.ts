import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IEventGroup } from '../../event-groups/list/event-groups.interaface';

@Component({
  selector: 'scroll',
  templateUrl: 'scroll.component.html',
  styleUrls: ['scroll.component.scss']
})

export class ScrollComponent implements OnInit {
  @Input() public options: IEventGroup[];

  @Input() public type: IEventGroup;

  @Output() public chose: EventEmitter<IEventGroup> = new EventEmitter();

  public ngOnInit() {
    if (this.options == null) {
      throw new Error("Attribute 'options' is required");
    }
  }

  public onChose(elem: IEventGroup) {
    this.chose.emit(elem);
  }
}
