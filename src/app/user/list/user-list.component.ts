import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
   * @param {ToastrService} toastrService - Toastr service
   * @param {UserService} userService - User service
   * @returns {void}
   */
  constructor(private toastrService: ToastrService, private userService: UserService) {
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

  /**
   * Delete user by id
   *
   * @param {string} id - User id
   * @returns {void}
   */
  public deleteUser(id: string): void {
    this.userService
      .deleteUser(id)
      .subscribe(() => {
        this.toastrService.success('User has been removed successfully.');
        this.getUsers();
      });
  }

  /**
   * Archive user by id
   *
   * @param {string} id - User id
   * @returns {void}
   */
  public archiveUser(id: string): void {
    this.userService
      .archiveUser(id)
      .subscribe(() => {
        this.toastrService.success('User has been archived successfully.');
        this.getUsers();
      });
  }

  /**
   * Unarchive user by id
   *
   * @param {string} id - User id
   * @returns {void}
   */
  public unarchiveUser(id: string): void {
    this.userService
      .unarchiveUser(id)
      .subscribe(() => {
        this.toastrService.success('User has been unarchived successfully.');
        this.getUsers();
      });
  }
}
