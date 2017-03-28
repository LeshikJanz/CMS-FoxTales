import { Injectable, Component } from '@angular/core';
//import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { Client } from './client.model';
import { ApiService } from './../shared/api.service';

import { Observable } from 'rxjs/Rx';



const CLIENTS_URL =  'http://foxtalesdev.azurewebsites.net/api/clients';


@Injectable()
export class ClientService {
    

    constructor(
        private _http: ApiService
    ){
       
    }

    public getClients()
    {
        return this._http.get(CLIENTS_URL).map(res => res.json());
    }

    public getClient(client:Client)
    {
        return this._http.get(CLIENTS_URL + '/' + client.id).map(res => res.json());
    }

    public postClient(client: Client)
    {
        return this._http.post(CLIENTS_URL, client).map(res => res.json());
    }

    public putClient(client:Client)
    {
        return this._http.put(CLIENTS_URL + '/' + client.id, client).map(res => res.json());
    }

    public postLogo (file: File, client:Client) {
    return Observable.create((observer:any) => {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();


        formData.append('file', file, file.name);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    observer.next(xhr.response);
                    observer.complete();
                } else {
                    observer.error(xhr.response);
                }
            }
        };

        

        xhr.open('POST', CLIENTS_URL + '/' + client.id + '/logo', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('token'));
        xhr.send(formData);
    });
  }
}