import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
import {NgClass} from '@angular/common';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
    
})
export class LoginComponent implements OnInit {



  ngOnInit() {
  }

   loginState: any;
    username: string;
    password: string;
    shake: boolean;
    invalidCreds: boolean;

    constructor(private _LoginService: LoginService, private _router: Router){
        this.loginState = 'inactive';
        this.username ='';
        this.password = '';
    }

    login(){
        this.invalidCreds = false;
        if(this.username.length == 0 && this.password.length == 0){
            this.shaker();
        }else
        {
            this._LoginService.postLogin(this.username, this.password)
              .subscribe(
               (data:any) => this.successFunction(),
               (error:any) => this.errorFunc()
              );
        }
        
        
    }


    private successFunction(){

        this._router.navigate(['users']);
    }

    errorFunc(){
        this.shaker();
        console.log("No");
        this.invalidCreds = true;
        
    }

    public shaker()
    {
        let timeset:any;
            clearTimeout(timeset);
            this.loginState = this.loginState == 'inactive' ? 'active' : 'inactive';
            timeset = setTimeout(() => {this.shake = false}, 500);
            this.shake = true;
    }
}
