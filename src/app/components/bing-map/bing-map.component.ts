import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['bing-map.component.scss']
})
export class BingMapComponent implements OnInit {
    @ViewChild('myMap') myMap;
  
  public ngOnInit(){
  //   var map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
  //       credentials: ''
  //   });
  //   var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
  //   var layer = new Microsoft.Maps.Layer();
  //   layer.add(pushpin);
  //   map.layers.insert(layer);
  // }
  }
}
