import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../client/client.service';
import { IClientSocial, IClientSocialIntegration } from '../../client/client.interface';
import hello from 'hellojs';
import { Observable, AsyncSubject } from 'rxjs';
import { IGalleryItem, IGalleryFilter } from '../../gallery/gallery-item.interface';
import { GalleryService } from '../../gallery/gallery.service';

/**
 * Gallery list component
 */
@Component({
  selector: 'gallery-item-list',
  templateUrl: 'gallery-item-list.component.html',
  styleUrls: ['gallery-item-list.component.scss']
})
export class GalleryItemListComponent implements OnInit {

  /**
   * Gallery id which has been opened
   *
   * @type {string}
   */
  public galleryId: number;

  /**
   * favorite/unfavorite event
   *
   * @type {EventEmitter}
   */
  @Output() public favorite: EventEmitter<IGalleryItem> = new EventEmitter();

  /**
   * Gallery items
   *
   * @type {IGalleryItem[]}
   */
  @Input() public galleryItems: IGalleryItem[];

  public socialIntegrations: IClientSocial[] = [
    { id: 1, name: 'Facebook' },
    { id: 2, name: 'Twitter' },
    { id: 5, name: 'Tumblr' }
  ];

  /**
   * Constructor
   *
   * @param {Route} route - ActivatedRoute
   * @returns {void}
   */
  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService,
    private clientService: ClientService
  ) {
  }

  public ngOnInit(): void {
    this.initSocial();
  }

  /**
   * On favorite
   *
   * item {IGalleryItem} - gallery item
   * @returns {void}
   */
  public onFavorite(item: IGalleryItem) {
    this.favorite.emit(item);
  }

  /**
   * Init social networks
   *
   * @returns {void}
   */
  public initSocial(): void {
    this.socialIntegrations.forEach((social: IClientSocial) => {
      const name = social.name.toLocaleLowerCase();
      const response = hello(name).getAuthResponse();

      let authData = JSON.parse(localStorage.getItem('hello')) || {};

      if (!response) {
        this.clientService
          .getSocialIntegration(social.id)
          .catch((error: any) => {
            return Observable.throw(error);
          })
          .flatMap((integration: IClientSocialIntegration) => {
            if (!integration) {
              return new AsyncSubject();
            }

            return this.clientService
              .getSocialToken(integration.platformID, integration.integrationID);
          })
          .subscribe((tokenData: string) => {
            if (!tokenData) {
              return;
            }

            authData[name] = JSON.parse(tokenData);
            localStorage.setItem('hello', JSON.stringify(authData));
          });
      }
    });
  }

}
