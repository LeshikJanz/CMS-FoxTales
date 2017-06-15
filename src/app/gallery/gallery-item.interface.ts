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
}

/**
 * Gallery interface filter
 */
export interface IGalleryFilter {
  id?: number;
  eventId?: number;
  experienceId?: number;
  contentOptionIds?: number[];
  skip?: any;
  take?: any;
  showOnFeed?: boolean;
  approved?: boolean;
  favoriteOnly?: boolean;
}
