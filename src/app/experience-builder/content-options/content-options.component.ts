import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';


@Component({
  selector: 'content-options-component',
  templateUrl: './content-options.component.html'
})

export class ContentOptionsComponent {
 @ViewChild('staticTabs') staticTabs: TabsetComponent;

  constructor(private router: Router,
             ) {}

             Next(){
                  this.staticTabs.tabs[1].active = true;
             }

             Finish(){
                 console.log('finish behavior');
             }

}
