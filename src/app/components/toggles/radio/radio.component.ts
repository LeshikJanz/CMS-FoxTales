import { Component, OnChanges, Output, Input } from '@angular/core';

@Component({
  selector: 'radio',
  templateUrl: 'radio.component.html',
  styleUrls: [ 'radio.component.scss' ]
})

export class RadioComponent implements OnChanges {
  @Input() public checked:boolean = false;

  ngOnChanges() {
    console.log('this.checked');
    console.log(this.checked);
  }
}
