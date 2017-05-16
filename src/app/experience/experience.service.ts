import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';

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
   *
   */

    public getExperiences(id) {

      return this.http.get('https://foxtalesdev.azurewebsites.net/api/events/' + id)
        .map((response) => {
            let temp = response.json();
            return temp.experiences;
        });
    }

}
