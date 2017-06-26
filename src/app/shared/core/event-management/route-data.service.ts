import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class RouteData {
  public name = new Subject();
  public imgPath = new Subject();
  public archieve = new Subject();
}
