import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Tag } from './tag';
import { PermissionService } from '../shared/core/auth/permission.service';
import { IEventGallery, IEventFilter, IEvent, IEventList } from './event.interface';

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
  public getEvents(filter: IEventFilter = {}) {
    let options = new RequestOptions({
      params: { ...filter }
    });

    return this.http.get(`${process.env.API_URL}/Events`, options)
      .map((response: Response) => {
        return response.json();
      });
  };

  /**
   * Get Event List
   */
  public getEventList(filter: IEventFilter = {}): Observable<IEventList> {
    let options = new RequestOptions({
      params: { ...filter }
    });

    return this.http.get(`${process.env.API_URL}/Events/GetPage`, options)
      .map((response: Response) => {
        return <IEventList> response.json();
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
  public getEvent(event: number) {
    return this.http.get(`${process.env.API_URL}/Events/${event}`)
        .map((response: Response) => {
          return response.json();
    });
  }

  public deleteEvent(event) {
    return this.http.delete(`${process.env.API_URL}/Events/${event.id}`)
        .map((response: Response) => {
          return response.json();
        });
  }

  /**
   * Clone event
   *
   * @param {number} id - Event id
   * @param {string} newName - Name
   * @param {startDate} newStartDate - Start date
   * @returns {Observable<IEvent>} - Cloned event
   */
  public cloneEvent(id: number, newName: string, newStartDate: string): Observable<IEvent> {
    return this.http
      .post(`${process.env.API_URL}/Events/${id}/clone`, {
        name: newName,
        startDate: newStartDate
      })
      .map((response: Response) => {
        return <IEvent> response.json();
      });
  }
}
