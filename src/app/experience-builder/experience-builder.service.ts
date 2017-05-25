import { Injectable } from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Tag } from './tag';
import { Experience } from './experience';

@Injectable()
export class ExperienceBuilderService {

    experience = {
        experienceId: '',
        eventId: '',
        productId: '',
        displayName: ''
    };

    /**
   * Constructor
   */
  constructor(private http: Http) {
  }


    /**
    * Add Experience
    */
  public addExperience(experience){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(experience)
    return this.http.post('https://foxtalesapi-dev.azurewebsites.net/api/Experiences/', JSON.stringify(experience), options)
      .map((response: Response) => {
          return response.json()
          
    });
  }

  public addContentOption(contentOptions){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let headerOptions = new RequestOptions({ headers: headers });
        return this.http.post('https://foxtalesapi-dev.azurewebsites.net/api/ContentOptions/' , JSON.stringify(contentOptions), headerOptions)
      .map((response: Response) => {
          console.log(response.json())
          return response.json()
          
    });
  }





}