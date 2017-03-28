import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {

  public eventId;
  public experienceId;
  public experienceDetails;

  constructor(private http:Http, private router:ActivatedRoute) {
  

   }

  ngOnInit() {
            this.router.params.subscribe(res => {
            // console.log(res);
            this.experienceId = res['experienceId'];
            this.eventId = res['eventId'];
            // this.experience.eventId = res['eventId'];
            // this.eventId.setValue(this.experience.eventId);
            // console.log(this.eventId.value);
            console.log(this.experienceId)
            console.log(this.eventId)
        });

        this.getExperience().subscribe(results => this.experienceDetails = results);   
  }


    private getExperience(){
      return this.http.get('https://foxtalesdev.azurewebsites.net/api/experiences/'+ this.experienceId)
        .map(res => {
          let temp = res.json();
          console.log(temp[0].displayName)
        
          return temp;
        })
    }

}
