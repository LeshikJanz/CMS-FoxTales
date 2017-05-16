import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class EventService {
  /**
   * Constructor
   *
   * @param {Http} http
   * @returns {void}
   */
  constructor(private http: Http) {
  }

  /**
   * Get Events
   *
   * Currently using the old endpoints for mock data, will be replacing to process.env.API_URL
   *
   */
  public getEvents() {
        return this.http.get('https://foxtalesdev.azurewebsites.net/api/events')
        .map(response => {
          let temp = response.json();
        
          return temp;
        })
  }

}
