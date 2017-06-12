import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Tag } from './tag';
import { PermissionService } from '../shared/core/auth/permission.service';
import { IEventGallery, IEventFilter } from './event.interface';

@Injectable()
export class EventService {
  /**
   * Constructor
   *
   * @param {Http} http
   * @returns {void}
   */
  constructor(private http: Http,
              private router: Router) {
  }

  /**
   * Get Events
   *
   * Currently using the old endpoints for mock data, will be replacing to process.env.API_URL
   *
   */
  public getEvents(filter: IEventFilter = {}) {
    let options = new RequestOptions({
      params: { clientId: PermissionService.clientId, ...filter }
    });

    return this.http.get(`${process.env.API_URL}/Events`, options)
        .map((response: Response) => {
          return response.json();
        });
  };

  /**
   * Get Event gallery
   *
   */
  public getEventGallery(id: number): Observable<IEventGallery> {
    return this.http.get(`${process.env.API_URL}/Events/${id}/gallery`)
      .map((response: Response) => response.json());
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

  /**
   * Create Event
   */
  public createEvent(event) {
    return this.http.post(`${process.env.API_URL}/Events`,
      event)
        .map((response: Response) => {
          return response.json();
    });
  }

  /**
   * Update Event
   */
  public updateEvent(event) {
    return this.http.put(`${process.env.API_URL}/Events/${event.id}`,
      event)
        .map((response: Response) => {
          return response.json();
    });
  }
  /**
   * Update Event
   */
  public getEvent(event) {
    return this.http.get(`${process.env.API_URL}/Events/${event}`)
        .map((response: Response) => {
          return response.json();
    });
  }

  public deleteEvent(event){
    return this.http.delete(`${process.env.API_URL}/Events/${event.id}`)
        .map((response: Response) => {
          return response.json();
        })
  }
}
