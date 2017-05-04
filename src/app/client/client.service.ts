import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Client } from './client';

/**
 * Client service
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
   * @returns {Observable<Client[]>} - Clients
   */
  public getClients(): Observable<Client[]> {
    return this.http.get('/assets/mock-data/client/clients.json')
      .map((response: Response) => response.json() as Client[]);
  }

  /**
   * Get client by id
   *
   * @param {string} id - Client id
   * @returns {Observable<Client>} - Client
   */
  public getClient(id: string): Observable<Client> {
    return this.http.get(`/assets/mock-data/client/client.json`)
      .map((response: Response) => <Client> response.json());
  }

  /**
   * Add client
   *
   * @param {Client} client - Client
   * @returns {Observable<Client>} - Client
   */
  public addClient(client: Client): Observable<Client> {
    return this.http.get(`/assets/mock-data/client/client.json`, client)
      .map((response: Response) => <Client> response.json());
  }

  /**
   * Update client
   *
   * @param {Client} client - Client
   * @returns {Observable<Client>} - Client
   */
  public updateClient(client: Client): Observable<Client> {
    return this.http.get(`/assets/mock-data/client/client.json`, client)
      .map((response: Response) => <Client> response.json());
  }

  /**
   * Delete client by id
   *
   * @param {string} id - Client id
   * @returns {Observable<Response>} - Response
   */
  public deleteClient(id: string): Observable<Response> {
    return this.http.get(`/assets/mock-data/client/empty.json`);
  }

  /**
   * Archive client by id
   *
   * @param {string} id - Client id
   * @returns {Observable<Response>} - Response
   */
  public archiveClient(id: string): Observable<Response> {
    return this.http.get(`/assets/mock-data/client/empty.json`);
  }

  /**
   * Unarchive client by id
   *
   * @param {string} id - Client id
   * @returns {Observable<Response>} - Response
   */
  public unarchiveClient(id: string): Observable<Response> {
    return this.http.get(`/assets/mock-data/client/empty.json`);
  }
}
