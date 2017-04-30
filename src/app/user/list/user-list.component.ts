import { Component, OnInit } from '@angular/core';
import { IUser } from '../user.interface';
import { User } from '../user';
import { UserService } from '../user.service';

/**
 * User list component
 */
@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  /**
   * Users
   *
   * @type {User[]}
   */
  public users: User[];

  /**
   * Constructor
   *
   * @param {UserService} userService
   * @returns {void}
   */
  constructor(private userService: UserService) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Get users
   *
   * @returns {void}
   */
  public getUsers(): void {
    this.userService
      .getUsers()
      .subscribe((users: IUser[]) => this.users = users);
  }
}
