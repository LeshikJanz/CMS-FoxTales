import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Tag } from './tag';

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
   */
  public getEvents() {
        return this.http.get('https://foxtalesapi-dev.azurewebsites.net/api/events')
        .map((response) => {
          let temp = response.json();
          return temp;
        });
  }

  /**
   * Get tags
   *
   * @returns {Observable<Tag[]>} - Tags
   */
  public  getTags(): Observable<Tag[]> {
    return this.http.get(`${process.env.API_URL}/Tags`)
      .map((response: Response) => response.json() as Tag[]);
  }
}
