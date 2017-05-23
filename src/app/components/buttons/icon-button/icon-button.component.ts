import { Component, Input, OnInit } from '@angular/core';

/**
 * Drop down menu
 */
@Component({
  selector: 'icon-button',
  templateUrl: 'icon-button.component.html',
  styleUrls: [ 'icon-button.component.scss' ]
})

export class IconButtonComponent implements OnInit {
  @Input() public type: string;

  public url: string;

  public ngOnInit() {
    if (this.type == null) {
      throw new Error("Attribute 'type' is required");
    }
  }
}
