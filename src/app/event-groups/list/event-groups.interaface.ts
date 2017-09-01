import { IEvent } from '../../event/event.interface';

/**
 * Event groups interface
 */
export interface IEventGroup {
  id: number;
  name: string;
  clientId: number;
  eventIds: number[];
  events?: IEvent[];
  gallery?: any;
  timePeriod?: string;
}

/**
 * Event groups interface
 */
export interface IEventGroupFilter {
  id?: number;
  clientId?: number;
  eventId?: number;
}
