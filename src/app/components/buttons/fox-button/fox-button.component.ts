import {Component, Input, OnInit, OnChanges} from '@angular/core';

/**
 * Drop down menu
 */
@Component({
  selector: 'fox-button',
  templateUrl: 'fox-button.component.html',
  styleUrls: ['fox-button.component.scss']
})

export class FoxButtonComponent implements OnInit {
  @Input() public value: string;

  @Input() public design: string;

  @Input() public disabled: boolean;

  @Input() public type: string = 'button';

  public ngOnInit() {
    if (this.value == null) {
      throw new Error("Attribute 'value' is required");
    }
    if (this.design == null) {
      throw new Error("Attribute 'design' is required");
    }
  }
}
