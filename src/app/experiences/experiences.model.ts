import {Product} from './product.model';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';

export class Experience
{
    public id:number;
    public name:string;
    public product: Product;
    public startDate: Date;
    public endDate: Date;
    public brands: string[];
    public eventId:number;
    public productId:number;

    private datePipe: DatePipe;

    constructor()
    {
        this.datePipe = new DatePipe('en-US');
    }

    public setStartDate(date:string, format?:string){
        this.startDate = moment(date).utc().toDate()

    }

    public setEndDate(date:string, format?:string){
         this.endDate = moment(date).utc().toDate()
    }

    public getStartDate(format:string){
        return this.datePipe.transform(this.startDate, format);
    }

    public getEndDate(format:string){
        return this.datePipe.transform(this.endDate, format);
    }
}