import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'EventDate'
})

export class EventDatePipe implements PipeTransform {
    transform(items: any[], type:any): any {
        let date:Date;
        date = new Date();
        return items.filter((value:any)=>{
            
            if(type === 'upcoming'){
                return value.startTime >= date;
            }else if(type === 'recent'){
                return value.startTime < date;
            }
            
        });
    }
}