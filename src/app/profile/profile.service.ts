import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { IProfile } from './profile.interface';

/**
 * Profile service
 */
@Injectable()
export class ProfileService {
  /**
   * Constructor
   *
   * @param {Http} http
   * @returns {void}
   */
  constructor(private http: Http) {
  }

  /**
   * Get profile
   *
   * @returns {Observable<IProfile>} - Profile
   */
  public getProfile(): Observable<IProfile> {
    return this.http.get(`${process.env.API_URL}/Profile`)
      .map((response: Response) => <IProfile> response.json());
  }

  /**
   * Update profile
   *
   * @param {string} logoBytes - Base64 encoded logo
   * @returns {Observable<Response>} - Response
   */
  public updateProfile(logoBytes: string): Observable<Response> {
    return this.http.put(`${process.env.API_URL}/Profile/logo`, {
      logo: logoBytes
    });
  }
}
