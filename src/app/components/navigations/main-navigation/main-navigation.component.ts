import { Component, Input, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../shared/core/auth/auth.service';
import { PermissionService } from '../../../shared/core/auth/permission.service';
import { UserService } from '../../../user/user.service';
import { IUser } from '../../../user/user.interface';
import { IActionState } from '../../../client/client.interface';
import { Router } from '@angular/router';
import { RouteData } from '../../../shared/core/event-management/route-data.service';

@Component({
  selector: 'main-navigation',
  templateUrl: 'main-navigation.component.html',
  styleUrls: ['main-navigation.component.scss']
})

export class MainNavigationComponent implements OnInit {
  public user: IUser;

  public options: IActionState[] = [
    { id: 1, action: 'Edit profile', callback: 'editProfile' },
    { id: 2, action: 'Log out', callback: 'logout' }
  ];

  constructor(private auth: AuthService,
              private userService: UserService,
              private router: Router,
              private routeData: RouteData) {

    this
      .routeData
      .imgPath
      .subscribe((n: any) => this.user.profileImagePath = n);
  }

  public ngOnInit() {
    this.userService.getUser(PermissionService.userId.toString())
      .subscribe((user: IUser) => {
          this.user = user;
          this.user.profileImagePath = `${this.user.profileImagePath}?_=${new Date().getTime()}`;
        }
      );
  }

  public editProfile() {
    this.router.navigate(['/profile']);
  }

  /**
   * Log out
   *
   * @returns {void}
   */
  public logout(): void {
    const context = this.auth.getContext();
    context.logout();
  }

  public onTypeChanged(action: IActionState) {
    if (this[action.callback]) {
      this[action.callback]();
    }
  }

  public onSearch(event: string) {
    console.log('onSearch');
  }

}
