import { Client } from './../clients/client.model';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';

export class Event
{
    public id : number;
    public clientId : number;
    public eventGroupId: any;
    public name : string;
    public location : any;
    public startTime: Date;
    public endTime: Date;
    public isActive: boolean;
    public config:string;
    public sendNotifications : boolean;
    public contentHostingLocation : boolean;
    public tags : string[];

    public client : Client;

    private datePipe : DatePipe;

    constructor()
    {
        this.datePipe = new DatePipe('en-US');
    }

    public setStartTime(time:string)
    {
        console.log(moment(time).utc().toDate());
        this.startTime = moment(time).utc().toDate();
    }

    public setEndTime(time:string)
    {
        this.endTime = moment(time).utc().toDate();
    }

    public getStartTime()
    {
        return moment(this.startTime).format('YYYY-MM-DD');
    }

    public getEndTime()
    {
        return moment(this.endTime).format('YYYY-MM-DD');
    }
}