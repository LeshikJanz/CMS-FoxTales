import { Component, Input, OnInit } from '@angular/core';

/**
 * Drop down menu
 */
@Component({
  selector: 'configure-button',
  templateUrl: 'configure-button.component.html',
  styleUrls: ['configure-button.component.scss']
})

export class ConfigureButtonComponent implements OnInit {
  @Input() public value: string;

  public ngOnInit() {
    if (this.value == null) {
      throw new Error("Attribute 'value' is required");
    }
  }
}
