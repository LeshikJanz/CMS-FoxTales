import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ClientService } from './../clients/client.service';
import { Event } from './event.model';
import { ApiService } from '../shared/api.service';
import * as moment from 'moment';

const EVENTS_URL = 'http://foxtalesdev.azurewebsites.net/api/events';

@Injectable()
export class EventService {


    constructor(private clientService: ClientService,
     private http: ApiService
     ) 
    {
        
    }

    public getClients()
    {
        return this.clientService.getClients();
    }

    public getEvents()
    {
        return this.http.get(EVENTS_URL).map((res: Response) => this.successFunction(res));
    }

    private successFunction(res:Response)
    {
        let items: any[];
        let events: Event[];

        events = new Array();
        items = res.json();

        items.forEach((value:any, index:any) => {
            var event = new Event();
           
            event.id = value.id;
            event.clientId = value.clientId;
            event.eventGroupId = value.eventGroupId;
            event.name = value.name;
            event.location = value.location;
            event.startTime = moment.utc(value.startTime).toDate();
            event.endTime = moment.utc(value.endTime).toDate();
            event.isActive = value.isActive;
            event.config = value.config;
            event.sendNotifications = value.sendNotifications;
            event.contentHostingLocation = value.contentHostingLocation;
            event.tags = value.tags;
            
            events.push(event);
        });

        return events;
    }


    public getEvent(event:Event)
    {
        return this.http.get(EVENTS_URL + '/' + event.id).map(res => {
            var event  = new Event();
            var value = res.json();
            event.id = value.id;
            event.clientId = value.clientId;
            event.eventGroupId = value.eventGroupId;
            event.name = value.name;
            event.location = value.location;
            event.startTime = moment(value.startTime).toDate();
            event.endTime = moment(value.endTime).toDate();
            event.isActive = value.isActive;
            event.config = value.config;
            event.sendNotifications = value.sendNotifications;
            event.contentHostingLocation = value.contentHostingLocation;
            event.tags = value.tags;

            return event;

        });
    }

    public postEvent(event: Event)
    {
        console.log(event.startTime);
        let ev = {
            id: event.id,
            clientId: event.clientId,
            eventGroupId: event.eventGroupId,
            name: event.name,
            location: event.location,
            startTime: event.startTime.toISOString(),
            endTime: event.endTime.toISOString(),
            isActive: event.isActive,
            sendNotifications: event.sendNotifications,
            contentHostingLocation: event.contentHostingLocation,
            tags: event.tags
        };


        return this.http.post(EVENTS_URL, ev).map(res => res.json());
    }

    public putEvent(event:Event)
    {
         let ev = {
            id: event.id,
            clientId: event.clientId,
            //eventGroupId: event.eventGroupId,
            name: event.name,
            location: event.location,
            startTime: event.startTime.toISOString(),
            endTime: event.endTime.toISOString(),
            isActive: event.isActive,
            sendNotifications: true,
            contentHostingLocation: '1',
            tags: event.tags
        };

        return this.http.put(EVENTS_URL + '/' + event.id, ev).map(res => res.json());
    }
}