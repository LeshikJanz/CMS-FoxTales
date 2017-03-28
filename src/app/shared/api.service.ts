import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService{
    
    private _headers: Headers;
    private authToken: any;

    constructor(
        @Inject(Http) private _http: Http, 
        @Inject(RequestOptions) private _options: RequestOptions
    ){
        this.authToken = {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}
        this._headers = new Headers(this.authToken);
        this._options = new RequestOptions({headers: this._headers});
    }

    public get(url:string): Observable<Response>
    {
        return this._http.get(url,this._options);
    }

    public post(url:string, body:any, options?:RequestOptions):Observable<Response>
    {
        //options.headers.append('Authorization', this.authToken.Authorization);

        return this._http.post(url, body, this._options);
    }

    public put(url:string, body:any, options?:RequestOptions):Observable<Response>
    {
        return this._http.put(url, body, this._options);
    }
}