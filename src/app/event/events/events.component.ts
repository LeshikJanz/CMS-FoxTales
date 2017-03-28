import { Component, OnInit } from '@angular/core';

import { EventListComponent } from '../event-list/event-list.component';
import { EventService } from '../event.service';
import { EventDatePipe } from '../../shared/event-date.pipe';
import {  
  ColumnMode,
  NgxDatatableModule} from '@swimlane/ngx-datatable';

@Component({
    selector: 'events',
    templateUrl: 'events.component.html',
    // providers: [EventService]
})
export class EventsComponent implements OnInit {
  //  public events: Event[];

  //   public upcoming: Event[];
  //   public recent: Event[];

  //   constructor(private eventService: EventService) {
  //       this.events = [];
  //       this.upcoming = [];
  //       this.recent = [];
  //    }

    //  options1 = new TableOptions({
    //     columnMode: ColumnMode.force,
    //     headerHeight: 50,
    //     footerHeight: 50,
    //     rowHeight: 'auto',
    //     limit: 5,
    // });

    // options2 = new TableOptions({
    //     columnMode: ColumnMode.force,
    //     headerHeight: 50,
    //     footerHeight: 50,
    //     rowHeight: 'auto',
    //     limit: 5,
    // });

    ngOnInit() 
    {
        // let eventPipe = new EventDatePipe();
        // this.eventService.getEvents().subscribe((res:any) => {
        //     this.events = res;
        //     this.upcoming = [...eventPipe.transform(this.events, 'upcoming')];
        //     this.recent = [...(eventPipe.transform(this.events, 'recent'))];
        // });
    }
}