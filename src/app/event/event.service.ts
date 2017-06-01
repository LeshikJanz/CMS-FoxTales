import { Injectable } from '@angular/core';
import { Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Tag } from './tag';
import { PermissionService } from '../shared/core/auth/permission.service';
import { IEventGallery } from './event.interface';

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
    let options = new RequestOptions({
      params: { clientId: PermissionService.clientId }
    });

    return this.http.get(`${process.env.API_URL}/Events`, options)
        .map((response: Response) => {
          let temp = response.json();

          return temp;
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
}
