import { Injectable } from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Tag } from './tag';
import { Experience } from './experience';

@Injectable()
export class ExperienceBuilderService {

  public experience = {
    experienceId: '',
    eventId: '',
    productId: '',
    displayName: '',
    primaryColor: '',
    secondaryColor: '',
    backgroundColor: '',
    uiBuilderText: '',
    uiBuilderOptInText: '',
    uiBuilderThankYouText: ''
    };

  /**
   * Constructor
   */
  constructor(private http: Http) {
  }

  /**
   * Add Experience
   */
  public addExperience(experience) {
    return this.http.post(`${process.env.API_URL}/Experiences/`,
      experience)
        .map((response: Response) => {
          return response.json();
    });
  }

  public addContentOption(contentOptions) {
    return this.http.post(`${process.env.API_URL}/ContentOptions/`, contentOptions)
        .map((response: Response) => {
          return response.json();
        });
  }

  public addRunTimesExperience(runTimes) {
    return this.http.post(`${process.env.API_URL}/Experiences/`
      + this.experience.experienceId + `/runtimes`, runTimes)
        .map((response: Response) => {
          return response.json();
        });
  }

  public postSocialShareSettings(settings) {
    return this.http.post(`${process.env.API_URL}/Experiences/`
      + this.experience.experienceId + `/socialsharesettings`, settings)
      .map((response: Response) => {
        return response.json();
      });
  }

  public postUIBuilderSettings(config) {
    // let header = new Headers({ 'Content-Type': 'application/json' });
    // let headerOptions = new RequestOptions({ headers: header });
    // let temp = JSON.stringify(config).replace(/"/g, '\\"');
    let temp = JSON.stringify(config)
    console.log(JSON.stringify(temp))
    return this.http.post(`${process.env.API_URL}/Experiences/`
      + this.experience.experienceId + `/config`,config)
      .map((response: Response) => {
        console.log(response)
          return response;
      });
  }
}
