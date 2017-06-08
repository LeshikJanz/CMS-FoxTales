import { Component, Input, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../shared/core/auth/auth.service';

@Component({
    selector: 'main-navigation',
    templateUrl: 'main-navigation.component.html',
    styleUrls: ['main-navigation.component.scss']
})

export class MainNavigationComponent implements OnInit {
    public clientName: string = '';

    constructor(private authService: AuthService) {
    }

    public ngOnInit() {
        this.clientName = this.authService.getContext().getUser().name
    }
}
