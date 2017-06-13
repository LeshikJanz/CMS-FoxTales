import { Component, Input, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../shared/core/auth/auth.service';
import { PermissionService } from "../../../shared/core/auth/permission.service";

@Component({
    selector: 'main-navigation',
    templateUrl: 'main-navigation.component.html',
    styleUrls: ['main-navigation.component.scss']
})

export class MainNavigationComponent implements OnInit, OnChanges {
    public clientName: string = '';

    constructor(private authService: AuthService) {
    }

    public ngOnInit() {
        this.clientName = this.authService.getContext().getUser().name;
        console.log('this.authService.getContext().getUser()');
        console.log(this.authService.getContext().getUser());
        console.log('PermissionService.clientId');
        console.log(PermissionService.clientId);
    }

    public ngOnChanges () {
        this.clientName = this.authService.getContext().getUser().name;
        console.log('this.authService.getContext().getUser()');
        console.log(this.authService.getContext().getUser());
        console.log('PermissionService.clientId');
        console.log(PermissionService.clientId);
    }

    public onSearch(event: string) {
      console.log('onSearch');
    }

}
