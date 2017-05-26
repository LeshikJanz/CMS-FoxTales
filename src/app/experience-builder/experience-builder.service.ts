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
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post('https://foxtalesapi-dev.azurewebsites.net/api/Experiences/',
      JSON.stringify(experience), options)
        .map((response: Response) => {
          return response.json();
    });
  }

  public addContentOption(contentOptions) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let headerOptions = new RequestOptions({ headers: header });
    return this.http.post('https://foxtalesapi-dev.azurewebsites.net/api/ContentOptions/' ,
      JSON.stringify(contentOptions), headerOptions)
        .map((response: Response) => {
          return response.json();
        });
  }

  public addRunTimesExperience(runTimes) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let headerOptions = new RequestOptions({ headers: header });

    return this.http.post('https://foxtalesapi-dev.azurewebsites.net/api/Experiences/'
      + this.experience.experienceId + '/runtimes'  , JSON.stringify(runTimes), headerOptions)
        .map((response: Response) => {
          return response.json();
        });
  }

  public postSocialShareSettings(settings) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let headerOptions = new RequestOptions({ headers: header });
    return this.http.post('https://foxtalesapi-dev.azurewebsites.net/api/Experiences/'
      + this.experience.experienceId + '/socialsharesettings',
      JSON.stringify(settings), headerOptions)
      .map((response: Response) => {
        return response.json();
      });
  }

  public postUIBuilderSettings(config) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let headerOptions = new RequestOptions({ headers: header });
    let temp = JSON.stringify(config).replace("'", "\'");
    return this.http.post('https://foxtalesapi-dev.azurewebsites.net/api/Experiences/'
      + this.experience.experienceId + '/config'  , temp, headerOptions)
      .map((response: Response) => {
          return response;
      });
  }
}
