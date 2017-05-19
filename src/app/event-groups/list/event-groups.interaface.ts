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
}
