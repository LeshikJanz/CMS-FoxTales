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
