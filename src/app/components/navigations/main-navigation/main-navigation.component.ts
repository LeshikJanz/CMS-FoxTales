import { Component, Input, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../shared/core/auth/auth.service';
import { PermissionService } from '../../../shared/core/auth/permission.service';
import { UserService } from '../../../user/user.service';
import { IUser } from "../../../user/user.interface";

@Component({
  selector: 'main-navigation',
  templateUrl: 'main-navigation.component.html',
  styleUrls: ['main-navigation.component.scss']
})

export class MainNavigationComponent implements OnInit {
  public user: IUser;

  constructor(private authService: AuthService,
              private userService: UserService) {
  }

  public ngOnInit() {
    this.userService.getUser(PermissionService.userId.toString())
      .subscribe((user: IUser) => {
        this.user = user;
        console.log('this.user');
        console.log(this.user);
      }
      )
  }

  public onSearch(event: string) {
    console.log('onSearch');
  }

}
