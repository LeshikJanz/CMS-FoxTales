import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { IClientList, IClientFilter, IClientSocialIntegration, IClientSocial } from './client.interface';
import { Client } from './client';
import { ClientLicense } from './client-license';

/**
 * Client service
 *
 * See: http://client2.dev.getfoxtales.com/swagger/#/Clients
 */
@Injectable()
export class ClientService {
  /**
   * Constructor
   *
   * @param {Http} http
   * @returns {void}
   */
  constructor(private http: Http) {
  }

  /**
   * Get clients
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Clients/ApiClientsGetClientListPost
   *
   * @param {IClientFilter} filter - Filter
   * @returns {Observable<IClientList>} - Clients
   */
  public getClients(filter: IClientFilter): Observable<IClientList> {
    return this.http.post(`${process.env.API_URL}/Clients/GetClientList`, filter)
      .map((response: Response) => <IClientList> response.json());
  }

  /**
   * Get client by id
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Clients/ApiClientsByIdGet
   *
   * @param {string} id - Client id
   * @returns {Observable<Client>} - Client
   */
  public getClient(id: string): Observable<Client> {
    return this.http.get(`${process.env.API_URL}/Clients/${id}`)
      .map((response: Response) => <Client> response.json());
  }

  /**
   * Add client
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Clients/ApiClientsPut
   *
   * @param {Client} client - Client
   * @returns {Observable<Client>} - Client
   */
  public addClient(client: Client): Observable<Client> {
    return this.http.put(`${process.env.API_URL}/Clients`, client)
      .map((response: Response) => <Client> response.json());
  }

  /**
   * Update client
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Clients/ApiClientsUpdatePut
   *
   * @param {Client} client - Client
   * @returns {Observable<Client>} - Client
   */
  public updateClient(client: Client): Observable<Client> {
    return this.http.put(`${process.env.API_URL}/Clients/Update`, [ client ])
      .map((response: Response) => <Client> response.json());
  }

  /**
   * Archive client by id
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Clients/ApiClientsArchivePost
   *
   * @param {string} id - Client id
   * @returns {Observable<Response>} - Response
   */
  public archiveClient(id: string): Observable<Response> {
    return this.http.post(`${process.env.API_URL}/Clients/Archive`, {
      selectedIds: [ id ]
    });
  }

  /**
   * Unarchive client by id
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/Clients/ApiClientsUnArchivePost
   *
   * @param {string} id - Client id
   * @returns {Observable<Response>} - Response
   */
  public unarchiveClient(id: string): Observable<Response> {
    return this.http.post(`${process.env.API_URL}/Clients/UnArchive`, {
      selectedIds: [ id ]
    });
  }

  /**
   * Get client licenses
   *
   * See: http://client2.dev.getfoxtales.com/swagger/#!/License/ApiLicenseGetGet
   *
   * @returns {Observable<ClientLicense[]>}
   */
  public getClientLicenses(): Observable<ClientLicense[]> {
    return this.http.get(`${process.env.API_URL}/License/Get`)
      .map((response: Response) => response.json() as ClientLicense[]);
  }

  /**
   * Social integration
   *
   * @param {number} id - Platform id
   * @param {string} name - Social name
   * @param {string} authResponse - Response data
   * @returns {Observable<Response>} - Response
   */
  public addSocialIntegration(
    id: number, name: string, authResponse: string
  ): Observable<Response> {
    return this.http.post(`${process.env.API_URL}/SocialIntegrations/${name}`, {
      platformID: id,
      token: authResponse
    });
  }

  /**
   * Get social integration
   *
   * @param {number} id - Platform id
   * @returns {Observable<IClientSocialIntegration>} - Social integration
   */
  public getSocialIntegration(id: number): Observable<IClientSocialIntegration> {
    return this.http.get(`${process.env.API_URL}/SocialIntegrations`)
      .map((response: Response) => {
        return response.json().filter((integration: IClientSocialIntegration) => {
          return integration.platformID === id;
        }).pop();
      });
  }

  /**
   * Get social token
   *
   * @param {number} platformId - Platform id
   * @param {number} integrationId - Integration id
   * @returns {Observable<string>} - Token details
   */
  public getSocialToken(platformId: number, integrationId: number): Observable<string> {
    return this.http.get(
      `${process.env.API_URL}/SocialIntegrations/${platformId}/${integrationId}`
    ).map((response: Response) => {
      const tokenData = response.json();
      return (tokenData) ? tokenData.token : '';
    });
  }

  /**
   * Get list of clients as [{ {id}, {name} }]
   *
   * @returns {Observable<IClientSocial>} - clients
   */
  public clientsLookup() : Observable<IClientSocial[]> {
    return this.http.get(
      `${process.env.API_URL}/Clients/Lookup`
    ).map((response: Response) =>
      response.json()
    );
  }
}
