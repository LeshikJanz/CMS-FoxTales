import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Tag } from './tag';

@Injectable()
export class ExperienceService {
  /**
   * Constructor
   *
   * @param {Http} http
   * @returns {void}
   */

  constructor(private http: Http) {
  }

  /**
   * Get Experiences
   *
   * Currently using the old endpoints for mock data, will be replacing to process.env.API_URL
   */

    public getExperiences(id) {
      return this.http.get(`${process.env.API_URL}/Experiences/?eventId=` + id)
        .map((response: Response) => {
          return response.json();
        });
    }

  /**
   * Get tags
   *
   * @returns {Observable<Tag[]>} - Tags
   */
  public  getTags(): Observable<Tag[]> {
    return this.http.get(`${process.env.API_URL}/Tags/brands`)
      .map((response: Response) => response.json() as Tag[]);
  }
}
