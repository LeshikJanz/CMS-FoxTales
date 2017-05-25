import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, Http } from '@angular/http';
import { IGalleryItem } from "./gallery-item.interface";

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
   * @param {IGalleryItem} filter - Filter
   * @returns {Observable<IGalleryItem>} - Gallery items
   */
  public getGalleryItems(): Observable<IGalleryItem[]> {
    return this.http.get(`${process.env.API_URL}/Media`)
      .map((response: Response) => <IGalleryItem[]> response.json());
  }
}
