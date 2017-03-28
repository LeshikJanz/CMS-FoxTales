import { Injectable, OnInit } from '@angular/core';

import {ApiService} from '../shared/api.service';
import {Experience} from './experiences.model';
import { Product } from './product.model';
import * as moment from 'moment';

const EXPERIENCE_URL = 'http://foxtalesdev.azurewebsites.net/api/experiences/';
const PRODUCT_URL = 'http://foxtalesdev.azurewebsites.net/api/products';
@Injectable()
export class ExperienceService implements OnInit {

    public experience:Experience;

    constructor(private http:ApiService) { }

    ngOnInit()
    {

    }


    public getProducts()
    {
        return this.http.get(PRODUCT_URL).map((res) => {
            let data:any[] = res.json();

            let products: Product[] = [];
            var result:any[] = data['result'];
            result.forEach(element => {
                var product = new Product();

                product.id = element.id;
                product.name = element.name;

                products.push(product);
            });

            return products;
        });
    }

    public getExperiences()
    {

    }

    public postExperience(exp:Experience)
    {
        return this.http.post(EXPERIENCE_URL, {
            Name: exp.name,
            ProductID: exp.productId,
            Brands: [],
            EventID: exp.eventId,
            Config: null,
            RunTimes: [{
                StartTime: exp.startDate.toISOString(),
                EndTime: exp.endDate.toISOString()
            }]
        }).map(res => res);
    }

    public putExperience(exp:Experience)
    {
        return this.http.post(EXPERIENCE_URL, {
            id: exp.id,
            name: exp.name,
            config: null,
            productId: exp.productId,
            startDate: exp.startDate.toISOString(),
            endDate: exp.endDate.toISOString(),
            brands: [],
            eventId: exp.eventId
        }).map(res => res);
    }
}