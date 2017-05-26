import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, Http, RequestOptions } from '@angular/http';
import { IGalleryItem, IGalleryFilter } from './gallery-item.interface';

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
  public getGalleryItems(filter: IGalleryFilter): Observable<IGalleryItem[]> {
    let options = new RequestOptions({
      params: filter
    });

    return this.http.get(`${process.env.API_URL}/Media`, options)
      .map((response: Response) => <IGalleryItem[]> response.json());
  }
}
