import {
  Component, Input, ViewChild, Output, EventEmitter
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { IEvent } from '../../../event/event.interface';
import { GalleryService } from '../../../gallery/gallery.service';
import { ToastrService } from 'ngx-toastr';
import { IGalleryItem } from '../../../gallery/gallery-item.interface';
import { ISwitcher } from '../../toggles/switcher/switcher.interface';

@Component({
  selector: 'download-modal',
  templateUrl: 'download-modal.component.html',
  styleUrls: ['download-modal.component.scss']
})

export class DownloadModalComponent {

  @ViewChild('aeModal') public lgModal: ModalDirective;
  public isModalShown: boolean = false;

  /**
   * is email sent?
   *
   * type {boolean}
   */
  public isEmailSent: boolean = false;

  /**
   * link to zip archive with media content
   *
   * @type {string}
   */
  public zipLink: string;

  /**
   * Download type (Filtered/entire)
   *
   * @type {number}
   */
  public downloadType: number;

  /**
   * Media items for downloading
   *
   * @type {number[]}
   */
  @Input() public galleryItems: IGalleryItem[];

  /**
   * Event
   *
   * @type {IEvent}
   */
  public event: IEvent;

  /**
   * Search value
   *
   * @type {string}
   */
  public search: string = '';

  /**
   * Search value
   *
   * @type {string}
   */
  public options: ISwitcher[] = [
    { id: 4, name: 'Filtered Gallery Result' },
    { id: 5, name: 'Entire Gallery' }
  ];

  /**
   * Run generating zip link
   *
   * @type {EventEmitter}
   */
  @Output() public download: EventEmitter<any> = new EventEmitter();

  /**
   * Control loading spinner
   *
   * @type {boolean}
   */
  public loading: boolean = false;

  /**
   * Constructor
   *
   * @param {ToastrService} toastrService - Toastr service
   * @param {GalleryService} galleryService - gallery service
   * @return {void}
   */
  constructor(private toastrService: ToastrService,
              private galleryService: GalleryService) {
  }

  /**
   * Show modal
   *
   * @return {void}
   */
  public show() {
    this.isModalShown = true;
  }

  /**
   * Hide modal
   *
   * @return {void}
   */
  public hide() {
    this.lgModal.hide();
  }

  /**
   * On close modal
   *
   * @return {void}
   */
  public onHidden() {
    this.isEmailSent = false;
    this.isModalShown = false;
  }

  /**
   * On switch type
   *
   * @return {void}
   */
  public onSwitch(event: number) {
    console.log('onSwitch')
    console.log(event)
    this.downloadType = event;
  }

  /**
   * Filter items according to current filter
   *
   * @return {void}
   */
  public getIdsForDownload() {
    let mediaIds = [];
    if (this.downloadType === 4) {
      mediaIds = this.galleryItems.map((gi: IGalleryItem) => {
        if (gi.isChecked) {
          return gi.id
        }
      }).filter((i: any) => i)
    }

    if (this.downloadType === 5) mediaIds = this.galleryItems.map((gi: IGalleryItem) => gi.id);
    return mediaIds;
  }

  /**
   * Run generating zip link
   *
   * @return {void}
   */
  public startDownload() {
    this.loading = true;
    this.isEmailSent = true;
    const mediaIds = this.getIdsForDownload();

    console.log('mediaIds');
    console.log(mediaIds);

    this.galleryService.getArchive(mediaIds)
      .subscribe((link: any) => {
        this.loading = false;
        this.zipLink = link;
      });
  }
}
