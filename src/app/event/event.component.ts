import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { 
    FormBuilder, 
    
    Validators, 
    FormGroup, 
    FormControl,
    ReactiveFormsModule
} from '@angular/forms';
import {Router} from '@angular/router';
import { Event } from './event.model';
import { EventService } from './event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [Event, EventService]
})
export class EventComponent implements OnInit {
    public eventForm: FormGroup;

    public eventName: FormControl;
    public startDate: FormControl;
    public endDate: FormControl;
    public location: FormControl;
    public eventTags: any[];
    public clientId: FormControl;
    

    public clients: any;
    public modalOpen: boolean;
    @Input('event') public event:Event;

    public eventTag: string;

    constructor(
        private eventService: EventService,
        private formBuilder: FormBuilder,
        private router: Router) 
        {
            this.event = new Event();
            this.eventName = new FormControl('', Validators.required);
            this.startDate = new FormControl('', Validators.required);
            this.endDate = new FormControl('', Validators.required);
            this.location = new FormControl('');
            this.clientId = new FormControl('', Validators.required);
           

            this.eventForm = this.formBuilder.group({
                eventName : this.eventName,
                startDate : this.startDate,
                endDate: this.endDate,
                location: this.location,
                clientId: this.clientId,
                
                
            });

            this.modalOpen = false;

            if(!this.event.tags){
                this.event.tags = [];
            }
        }

    ngOnInit() { 
        this.eventService.getClients().subscribe((res) => this.clients = res);
    }

    ngOnChanges()
    {
        
        if(this.event.id){
            console.log(this.event.location);
            this.eventName.setValue(this.event.name);
            this.startDate.setValue(this.event.getStartTime());
            this.endDate.setValue(this.event.getEndTime());
            this.location.setValue(this.event.location);
            this.clientId.setValue(this.event.clientId);
            this.eventTags = this.event.tags;
        }
       

    }

   

    public addTag(str:string)
    {
        this.event.tags.push(str.trim());
        this.eventTag = '';
    }

    public removeTag(tag:any)
    {
        console.log("it is pressed");
        var indexTag = this.event.tags.indexOf(tag);
        this.event.tags.splice(indexTag, 1);
        console.log(indexTag);
    }

    public onSave()
    {
        //this.clientForm.updateValueAndValidity();
        
        if(this.eventForm.valid)
        {
            
            this.event.name = this.eventName.value;
            this.event.setStartTime(this.startDate.value);
            this.event.setEndTime(this.endDate.value);
            this.event.location = this.location.value;
            this.event.clientId = this.clientId.value;
            this.event.tags = this.eventTags;
            //this.client.id = this.id.value;
            console.log(this.event.location);
            if(this.event.id)
            {
                this.eventService.putEvent(this.event).subscribe((res) => {
                    this.event.id = res.id;
                    this.modalOpen = true;
                });
            }else{
                this.eventService.postEvent(this.event).subscribe((res) => {
                    this.event.id = res.id;
                    this.modalOpen = true;
                });
            }
            
        }
       
    }

    public addExperience()
    {
        this.router.navigate(['/events', this.event.id, 'experience']);
        this.modalOpen = !this.modalOpen;
    }
}
