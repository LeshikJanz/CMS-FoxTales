import { Component, OnChanges, Output, Input } from '@angular/core';

@Component({
  selector: 'radio',
  templateUrl: 'radio.component.html',
  styleUrls: [ 'radio.component.scss' ]
})

export class RadioComponent {
  @Input() public type:string = 'Bacon';
}
