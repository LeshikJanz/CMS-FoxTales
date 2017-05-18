import { Component, Input, OnInit } from '@angular/core';

/**
 * Drop down menu
 */
@Component({
  selector: 'add-button',
  templateUrl: 'add-button.component.html',
  styleUrls: ['add-button.component.scss']
})

export class AddButtonComponent implements OnInit {
  @Input() public value: string;

  public ngOnInit() {
    if (this.value == null) {
      throw new Error(`Attribute 'value' is required`);
    }
  }
}
