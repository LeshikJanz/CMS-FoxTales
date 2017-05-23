import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColorPickerService, Rgba } from 'ngx-color-picker';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'ui-builder-component',
  templateUrl: './ui-builder.component.html',
  styleUrls: ['./ui-builder.component.scss']
})

export class UIBuilderComponent {
  public primaryColor: string;
  public secondaryColor: string;
  public backgroundColor: string;
  private text: string;
  private optInText: string;
  private thankYouText: string;

 @ViewChild('staticTabs') staticTabs: TabsetComponent;

  constructor(private router: Router,
              private cpService: ColorPickerService) {}

Next(){
  console.log(this.primaryColor)
  console.log(this.secondaryColor)
  console.log(this.backgroundColor)
  this.staticTabs.tabs[1].active = true;
}

Finish(){
  console.log(this.text);
  console.log(this.optInText);
  console.log(this.thankYouText)
}

}
