import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { IUserList, IUserFilter } from './user.interface';
import { IUserRole } from './user-role.interface';
import { IUserClient } from './user-client.interface';
import { User } from './user';

/**
 * User service
 *
 * See: http://client2.dev.getfoxtales.com/swagger/#!/Users
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
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Users/ApiUsersGetUserListPost
   *
   * @param {IUserFilter} filter - Filter
   * @returns {Observable<IUserList>} - Users
   */
  public getUsers(filter: IUserFilter): Observable<IUserList> {
    return this.http.post(`${process.env.API_URL}/Users/GetUserList`, filter)
      .map((response: Response) => <IUserList> response.json());
  }

  /**
   * Get user by id
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Users/ApiUsersGetByIdGet
   *
   * @param {string} id - User id
   * @returns {Observable<User>} - User
   */
  public getUser(id: string): Observable<User> {
    return this.http.get(`${process.env.API_URL}/Users/GetById?id=${id}`)
      .map((response: Response) => <User> response.json());
  }

  /**
   * Add user
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Users/ApiUsersPut
   *
   * @param {User} user - User
   * @returns {Observable<User>} - User
   */
  public addUser(user: User): Observable<User> {
    return this.http.put(`${process.env.API_URL}/Users`, user)
      .map((response: Response) => <User> response.json());
  }

  /**
   * Update user
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Users/ApiUsersUpdatePost
   *
   * @param {User} user - User
   * @returns {Observable<User>} - User
   */
  public updateUser(user: User): Observable<User> {
    return this.http.post(`${process.env.API_URL}/Users/Update`, user)
      .map((response: Response) => <User> response.json());
  }

  /**
   * Archive user by id
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Users/ApiUsersArchivePost
   *
   * @param {string} id - User id
   * @returns {Observable<Response>} - Response
   */
  public archiveUser(id: string): Observable<Response> {
    return this.http.post(`${process.env.API_URL}/Users/Archive`, {
      selectedIds: [ id ]
    });
  }

  /**
   * Unarchive user by id
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Users/ApiUsersUnArchivePost
   *
   * @param {string} id - User id
   * @returns {Observable<Response>} - Response
   */
  public unarchiveUser(id: string): Observable<Response> {
    return this.http.post(`${process.env.API_URL}/Users/UnArchive`, {
      selectedIds: [ id ]
    });
  }

  /**
   * Get user roles
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Role/ApiRoleGet
   *
   * @returns {Observable<IUserRole[]>}
   */
  public getUserRoles(): Observable<IUserRole[]> {
    return this.http.get(`${process.env.API_URL}/Role`)
      .map((response: Response) => response.json() as IUserRole[]);
  }

  /**
   * Get client list
   *
   * @returns {Observable<IUserClient[]>} - Client list
   */
  public getClients(): Observable<IUserClient[]> {
    return this.http.get(`${process.env.API_URL}/Clients/Lookup`)
      .map((response: Response) => response.json().result as IUserClient[]);
  }
}
