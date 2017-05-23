/**
 * Gallery item interface
 */
export interface IGalleryItem {
  id: number;
  dateCreated: string;
  emails: [string];
  showInFeed: boolean;
  experienceId: number;
  contentOptionId: number;
  favorite: boolean;
  visible: boolean;
}
