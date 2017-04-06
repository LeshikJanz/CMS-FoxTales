import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { 
    FormBuilder, 
  
    Validators, 
    FormGroup, 
    FormControl
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {ExperienceService} from './experiences.service';
import {Experience} from './experiences.model';
import {Product} from './product.model';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {ButtonModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'],
  providers: [Experience, Product, ExperienceService]
})
export class ExperiencesComponent implements OnInit {
    public experienceForm: FormGroup;
    //public eventId:number;
    public experience: Experience;
    public product:Product;
    public products: Product[];

    public name: FormControl;
    public startDate: FormControl;
    public endDate: FormControl;
    public eventId: FormControl;
    public productId: FormControl;

    public brands: string[];
    public brand: string;

public rows: any[];
 public items: any[];


    constructor(
        private router: ActivatedRoute,
        private nav: Router,
        private experienceService: ExperienceService,
        private formBuilder: FormBuilder,
        private http:Http
    ){

    
      this.rows = [];
        this.experience = new Experience();
        this.name = new FormControl('', Validators.required);
        this.startDate = new FormControl('', Validators.required);
        this.endDate = new FormControl('', Validators.required);
        this.eventId = new FormControl('', Validators.required);
        this.productId = new FormControl('', Validators.required);
        this.experience.brands = [];

        this.experienceForm = this.formBuilder.group({
            name : this.name,
            startDate : this.startDate,
            endDate: this.endDate,
            eventId: this.eventId,
            productId: this.productId
            
            
        });


    }

          private getEvents(){
      return this.http.get('https://foxtalesdev.azurewebsites.net/api/events/'+ this.eventId.value)
        .map(res => {
          let temp = res.json();
        
          return temp;
        })
    }

    ngOnInit() {
        this.router.params.subscribe(res => {
            console.log(res);
            this.experience.eventId = res['eventId'];
            this.eventId.setValue(this.experience.eventId);
            console.log(this.eventId.value);
        });

        this.experienceService.getProducts().subscribe(res => {
            this.products = res;
        });
           this.getEvents().subscribe(results =>{
             console.log(results.experiences)
            //  this.rows.push(results)
          
    
 this.rows = results.experiences;
           } );

            this.items = [
            {label: 'Edit', icon: 'fa-refresh', command: () => {
              
            }},
            {label: 'Clone', icon: 'fa-close', command: () => {
              
            }},
            {label: 'Archive', icon: 'fa-link', url: 'http://angular.io'},
            {label: 'Assign User', icon: 'fa-paint-brush', routerLink: ['/theming']}
        ];
     }


    ngOnChanges()
    {
        console.log(this.product);


    }

     public addTag(str:string)
    {
        this.experience.brands.push(str.trim());
        this.brand = '';
    }

    public removeTag(tag:any)
    {
        console.log("it is pressed");
        var indexTag = this.experience.brands.indexOf(tag);
        this.experience.brands.splice(indexTag, 1);
        console.log(indexTag);
    }

     public onSave()
    {
        //this.clientForm.updateValueAndValidity();
        
        if(this.experienceForm.valid)
        {
            this.experience.name = this.name.value;
            this.experience.setStartDate(this.startDate.value);
            this.experience.setEndDate(this.endDate.value);
            this.experience.eventId = this.eventId.value;
            this.experience.productId = this.productId.value;
            
            console.log(this.experience);
            this.experienceService.postExperience(this.experience).subscribe((res) => {
                this.experience.id = res.json().id;
                this.nav.navigate(['/events']);
            });
            
            
        }
       
    }

}
