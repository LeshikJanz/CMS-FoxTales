import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from './user';

/**
 * User service
 */
@Injectable()
export class UserService {
  /**
   * Constructor
   *
   * @param {Http} http
   * @returns {void}
   */
  constructor(private http: Http) {
  }

  /**
   * Get users
   *
   * @returns {Observable<User[]>} - Users
   */
  public getUsers(): Observable<User[]> {
    return this.http.get('/assets/mock-data/user/users.json')
      .map((response: Response) => response.json() as User[]);
  }

  /**
   * Get user by id
   *
   * @param {string} id - User id
   * @returns {Observable<User>} - User
   */
  public getUser(id: string): Observable<User> {
    return this.http.get(`/assets/mock-data/user/user.json`)
      .map((response: Response) => <User> response.json());
  }
}
