import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, Http, RequestOptions, Headers } from '@angular/http';
import { IGalleryItem, IGalleryFilter } from './gallery-item.interface';
import { PermissionService } from '../shared/core/auth/permission.service';

@Injectable()
export class GalleryService {

  /**
   * Constructor
   *
   * @param {Http} http
   * @returns {void}
   */
  constructor(private http: Http) {
  }

  /**
   * Get gallery items
   *
   * @param {IGalleryFilter} filter - Filter
   * @returns {Observable<IGalleryItem>} - Gallery items
   */
  public getGalleryItems(filter: IGalleryFilter = {}): Observable<IGalleryItem[]> {
    let options = new RequestOptions({
      params: {
        clientId: PermissionService.clientId,
        ...filter
      }
    });

    return this.http.get(`${process.env.API_URL}/Media`, options)
      .map((response: Response) => <IGalleryItem[]> response.json());
  }

  /**
   * Change favorite/unfavorite status
   *
   * @param {number} id - thumbnail id
   * @param {boolean} status - favorite status
   * @returns {Observable<IGalleryItem>} - Gallery items
   */
  public makeFavorite(id: number, status: boolean): Observable<Response> {
    return this.http.post(`${process.env.API_URL}/Media/${id}/favorite/${status}`, '');
  }

  /**
   * Get link on zip archive
   *
   * @param {number[]} mediaIds - media ids
   * @returns {Observable<string>} - link on zip archive
   */
  public getArchive(mediaIds: number[]): Observable<string> {
    return this.http.post(`${process.env.API_URL}/Media/archiveSelected`, mediaIds)
      .map((response: Response) => response.text());
  }
}
