import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { IClientList, IClientFilter } from './client.interface';
import { Client } from './client';
import { ClientLicense } from './client-license';
import { IEvent } from "../event/event.interface";
import { IEventGroup } from "./event-groups.interaface";

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
    return this.http.get(`${process.env.API_URL}/EventGroups`)
      .map((response: Response) => <IEventGroup[]> response.json());
  }
}
