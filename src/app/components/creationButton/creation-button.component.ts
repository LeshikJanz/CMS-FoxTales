import { Component, Output, EventEmitter, Input } from '@angular/core';

/**
 * Upload Button component
 */
@Component({
  selector: 'creation-button',
  templateUrl: 'creation-button.component.html',
  styleUrls: ['creation-button.component.scss']
})
export class CreationButtonComponent {
  @Output() public clicked: EventEmitter<string> = new EventEmitter();

  @Input() public value: string;

  public handleClick = (event) => {
    this.clicked.emit(event);
  }
}
