import { Component, OnInit, Input, OnChanges, EventEmitter } from '@angular/core';

import { EventDatePipe } from '../../shared/event-date.pipe';
// import {  TableOptions,
//   TableColumn,
//   ColumnMode,
//   Angular2DataTableModule} from 'angular2-data-table';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'event-list',
    templateUrl: 'event-list.component.html',
    providers: []
})
export class EventListComponent implements OnInit, OnChanges {
    

    @Input() options:any;

    @Input() rows:any;

    private temp:any[];

    public data;
    @Input() sortDir;

    constructor(private http:Http) {

  this.getEvents().subscribe(results => this.rows = results);

        this.rows = [];
        this.temp = [];

        this.sortDir = null;
     }


    ngOnInit() {
      


     }

    ngOnChanges(event)
    {
        
        this.data = [...this.rows];
        this.dateSortFunction(this.data, this.sortDir);
        
        
    }

        private getEvents(){
      return this.http.get('https://foxtalesdev.azurewebsites.net/api/events')
        .map(res => {
          let temp = res.json();
        
          return temp;
        })
    }

    public dataFilter(val, prop)
    {
        
        this.data = [...this.rows];

        let temp = this.data.filter(function(d) {
        return d[prop].toLowerCase().indexOf(val.toLowerCase()) !== -1 || !val;
        });

        // update the rows
        this.data = [...temp];



    }

    public dateSort(sort)
    {
       

       let rows = [...this.data];

        sort();
        rows = this.dateSortFunction(rows, this.sortDir);

      if(this.sortDir == 'asc')
       {
           this.sortDir = 'desc';
       }else
       {
           this.sortDir = 'asc';
       }

      this.data = rows;
    }

    private dateSortFunction(data:any[], sortDir:string)
    {
        data.sort((a, b) => {
            if(this.sortDir === 'asc')
            {
                if(a.startTime < b.startTime) return -1;
                if(a.startTime > b.startTime) return 1;
                return 0;
            }else if(this.sortDir === 'desc')
            {
                if(a.startTime > b.startTime) return -1;
                if(a.startTime < b.startTime) return 1;
                return 0;
            }
      });

      return data;
    }
}






