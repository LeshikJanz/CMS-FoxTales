/**
 * Gallery item interface
 */
export interface IGalleryItem {
  id: number;
  dateCreated: string;
  mediaPath: string;
  emails: [string];
  showInFeed: boolean;
  experienceId: number;
  contentOptionId: number;
  favorite: boolean;
  visible: boolean;
  isChecked?: boolean;
}

/**
 * Camera info interface
 */
export interface ICameraInfo {
  cameraInfo: string;
  lens: string;
  iso: number;
  shutterSpeed: string;
  aperture: string;
  focalLength: number;
  whiteBalance: number;
  pictureStyle: string;
}

/**
 * Gallery interface filter
 */
export interface IGalleryFilter {
  id?: number;
  clientId?: number;
  eventId?: number;
  experienceId?: number;
  contentOptionIds?: number[];
  skip?: any;
  take?: any;
  showOnFeed?: boolean;
  approved?: boolean;
  favoriteOnly?: boolean;
  startFrom?: string;
  startTo?: string;
  sortType?: number;
  ascending?: boolean;
}
