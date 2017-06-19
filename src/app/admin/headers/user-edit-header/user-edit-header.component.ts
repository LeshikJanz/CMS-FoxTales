import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../../user/user.interface';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'user-edit-header',
  templateUrl: 'user-edit-header.component.html',
  styleUrls: ['user-edit-header.component.scss',
    '../../../shared/styles/animations.scss']
})

export class UserEditHeaderComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private userService: UserService) {
  }

  public user: IUser;

  public ngOnInit() {
    this.route.children[0].params.subscribe((params: any) => {
      this.userService.getUser(params['id'])
        .subscribe((user: IUser) => {
          this.user = user
          console.log('this.user');
          console.log(this.user);
        }
        )
    });
  }
}
