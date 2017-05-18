import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';

@Injectable()
export class ExperienceBuilderService {

    /**
   * Constructor
   */
  constructor(private http: Http) {
  }


    /**
    * Add Experience
    */
  public addExperience(){
    return this.http.post('https://foxtalesapi-dev.azurewebsites.net/api/Experiences/', JSON.stringify({
      "name": "1dasfasdsad",
      "eventId": "1",
      "productId": "1"
    }))
      .map((response: Response) => response.json());
  }





}