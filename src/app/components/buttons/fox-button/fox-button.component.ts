import { Component, Input, OnInit } from '@angular/core';

/**
 * Drop down menu
 */
@Component({
  selector: 'fox-button',
  templateUrl: 'fox-button.component.html',
  styleUrls: [ 'fox-button.component.scss' ]
})

export class FoxButtonComponent implements OnInit {
  @Input() public value: string;

  @Input() public type: string;

  public ngOnInit() {
    if (this.value == null) {
      throw new Error(`Attribute 'value' is required`);
    }
    if (this.type == null) {
      throw new Error(`Attribute 'type' is required`);
    }
  }
}
