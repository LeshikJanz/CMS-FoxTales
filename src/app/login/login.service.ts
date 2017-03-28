import { Injectable } from '@angular/core';

import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

const LOGIN_URL = 'http://foxtalesdev.azurewebsites.net/connect/token';
const ACCOUNT_RECOVER_URL = 'http://foxtalesdev.azurewebsites.net/api/account/recover';
const ACCOUNT_RESET_URL = 'http://foxtalesdev.azurewebsites.net/api/account/reset';

@Injectable()

export class LoginService
{
    
    private _body: any;
    private _headers: Headers;


    constructor(
        private _http: Http, 
        private _options: RequestOptions
    ){
        
        this._headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        this._options = new RequestOptions({headers: this._headers});

        this._body = {
            grant_type: 'password',
            scope: 'roles offline_access',
            resource: 'http://foxtalesdev.azurewebsites.net'
        }
    }

    public postLogin(username: string, password: string):any{
        
        let body = this._body;

        body.username = username;
        body.password = password;
        console.log(this.urlEncode(body));//for now
        return this._http.post(LOGIN_URL, this.urlEncode(body), this._options).map(
            (res) => this.extractData(res)
        ).catch((error:any) => {
            return Observable.throw(new Error(error.status));
        });
    }

    private extractData(res: Response) {
        let body = res.json();
        window.sessionStorage.clear();
        //window.sessionStorage.setItem('token', data.access_token);
        if(body){
            window.sessionStorage.setItem('token', body.access_token);
        }else{
            body = {};
        }

        return body;
    }

    public urlEncode(body: any):string{
        let encoded = '';

        for(var key in body)
        {
            encoded += key + '=' + body[key] + '&';
        }

        encoded = encoded.substring(0, encoded.length - 1);

        return encoded;
    }


    public sendPasswordResetEmail(username:string)
    {
        let options = new RequestOptions({headers: new Headers({
            'Content-Type': 'multipart/form-data;  boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        })});

        let formData = '?email=' + username;
        let str = `
------WebKitFormBoundary7MA4YWxkTrZu0gW--`;
        return this._http.post(ACCOUNT_RECOVER_URL + formData, str, options).map(res => res);
    }

    public resetPassword(obj:any)
    {
        return this._http.post(ACCOUNT_RESET_URL, obj).map(res => res);
    }
}