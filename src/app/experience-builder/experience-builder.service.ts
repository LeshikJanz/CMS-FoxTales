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
    uiBuilderThankYouText: '',
    emailBuilderName: '',
    fromEmailAddress: '',
    senderName: '',
    emailSubject: '',
    emailPreviewText: '',
    emailBodyText: '',
    ctaText: '',
    runTimes: '',
    brands: ''
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

  public updateContentOption(contentOptions) {
    return this.http.post(`${process.env.API_URL}/ContentOptions/`, contentOptions)
        .map((response: Response) => {
          return response.json();
        });
  }

  public addBasicDetailsExperience(details) {
    return this.http.put(`${process.env.API_URL}/Experiences/`
      + this.experience.experienceId, details)
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
    return this.http.post(`${process.env.API_URL}/Experiences/`
      + this.experience.experienceId + `/config`, config)
      .map((response: Response) => {
        console.log(response);
        return response;
      });
  }

  public postEmailSettings() {
    return this.http.post(`${process.env.API_URL}/Experiences/`
      + this.experience.experienceId + `/emailSettings`, {
        name: this.experience.emailBuilderName,
        senderName: this.experience.senderName,
        senderAddress: this.experience.fromEmailAddress,
        subject: this.experience.emailSubject,
        emailBody: this.experience.emailBodyText,
        previewText: this.experience.emailPreviewText,
        callToActionText: this.experience.ctaText
      })
      .map((response: Response) => {
        console.log(response);
        return response;
      });

  }

  public postContentGallerySettings(settings) {
    return this.http.post(`${process.env.API_URL}/Experiences/`
      + this.experience.experienceId + `/galleries`, settings)
      .map((response: Response) => {
        console.log(response);
        return response;
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

  /**
   * Get Experience
   *
   */
    public getExperience(id) {
      return this.http.get(`${process.env.API_URL}/Experiences/` + id)
        .map((response: Response) => {
          return response.json();
        });
    }

    public getContentOptions(id) {
      return this.http.get(`${process.env.API_URL}/Experiences/` + id +
      `/contentoptions`)
        .map((response: Response) => {
          return response.json();
        });
    }
}
