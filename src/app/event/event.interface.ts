/**
 * Experience interface
 */
export interface IExperience {
  brands: any[];
  id: number;
  name: string;
}

/**
 * Event interface
 */
export interface IEvent {
  id: number;
  clientId: string;
  config: string;
  contentHostingLocation: number;
  endTime: string;
  eventGroupId: number;
  experiences: IExperience[];
  isRunning: boolean;
  location: string;
  name: string;
  sendNotifications: boolean;
  startTime: string;
  tags: any[];
}

/**
 * Event interface
 */
export interface IEventGallery {
  id: number;
  name: string;
  hashtag: string;
  shortUrl: string;
  backgroundColor: string;
  backgroundImage: string;
  backgroundFit: string;
  backgroundPosition: string;
  showMobileBackground: boolean;
  mobileBackgroundImage: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  navigationEnabled: string;
  contentOptionIds: number[];
}

/**
 * Event filter
 */
export interface IEventFilter {
  sortBy?: string;
  sortAscending?: boolean;
  ignoreEventGroupFilter?: boolean;
}
