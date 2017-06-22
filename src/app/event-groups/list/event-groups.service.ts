import { Injectable } from '@angular/core';
import { Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { IEventGroup } from './event-groups.interaface';
import { PermissionService } from '../../shared/core/auth/permission.service';

/**
 * Client service
 *
 * See: http://client2.dev.getfoxtales.com/swagger/#/Clients
 */
@Injectable()
export class EventGroupsService {
  /**
   * Constructor
   *
   * @param {Http} http
   * @returns {void}
   */
  constructor(private http: Http) {
  }

  /**
   * Get Event groups
   *
   * @returns IEventGroup[]
   */
  public getEventGroups(): Observable<IEventGroup[]> {
    let options = new RequestOptions({
      params: { clientId: PermissionService.clientId }
    });

    return this.http.get(`${process.env.API_URL}/EventGroups`, options)
      .map((response: Response) => <IEventGroup[]> response.json())
      .catch(this.handleError);
  }

  /**
   * Get Event group by id
   *
   * @returns IEventGroup
   */
  public getEventGroup(id: number): Observable<IEventGroup> {
    return this.http.get(`${process.env.API_URL}/EventGroups/${id}`)
      .map((response: Response) => <IEventGroup> response.json())
      .catch(this.handleError);
  }

  /**
   * Add event group
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/EventGroups/ApiEventGroupsPost
   *
   * @param {eventGroup} event group - Event Group
   * @returns {Observable<IEventGroup>} - Event group
   */
  public addEventGroup(eventGroup: IEventGroup): Observable<IEventGroup> {
    return this.http.post(`${process.env.API_URL}/EventGroups`, eventGroup)
      .map((response: Response) => <IEventGroup> response.json())
      .catch(this.handleError);
  }

  /**
   * Update event group
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Clients/ApiEventGroupsPut
   *
   * @param {IEventGroup} eventGroup - Event group
   * @returns {Observable<IEventGroup>} - Event group
   */
  public updateEventGroup(eventGroup: IEventGroup): Observable<IEventGroup> {
    return this.http.put(`${process.env.API_URL}/EventGroups/${eventGroup.id}`, eventGroup)
      .map((response: Response) => <IEventGroup> response.json())
      .catch(this.handleError);
  }

  /**
   * Remove events from group
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Clients/ApiEventGroups{id}/removeevents
   * @param {number} groupId - group id
   * @param {number[]} eventIds - ids of deleting events
   * @returns {any}
   */
  public removeGroupEvents(groupId: number, eventIds: number[]) {
    return this.http.post(`${process.env.API_URL}/EventGroups/${groupId}/removeevents`, eventIds);
  }

  /**
   * Handle error
   *
   * @param {Response} error
   * @return {Observable<Error>} -
   */
  public handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
