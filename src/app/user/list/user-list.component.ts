import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICol, ITableAction } from '../../shared/table';
import { IUserList, IUserFilter } from '../user.interface';
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
   * Total users
   *
   * @type {number}
   */
  public totalUsers: number = 0;

  /**
   * Table columns
   *
   * @type {ICol[]}
   */
  public cols: ICol[] = [
    { id: 'firstName',      title: 'First Name',  format: 'default',  searchable: true },
    { id: 'lastName',       title: 'Last Name',   format: 'default',  searchable: true },
    { id: 'email',          title: 'Email',       format: 'default',  searchable: true },
    { id: 'phone',          title: 'Phone',       format: 'default',  searchable: true },
    { id: 'clientName',     title: 'Client',      format: 'default',  searchable: true },
    { id: 'location',       title: 'Location',    format: 'default',  searchable: true },
    { id: 'lastActiveDate', title: 'Last Active', format: 'default',  searchable: true }
  ];

  /**
   * Row actions
   *
   * @type {ITableAction[]}
   */
  public actions: ITableAction[] = [
    { title: 'Edit',      callback: 'editUser' },
    { title: 'Archive',   callback: 'archiveUser' },
    { title: 'Unarchive', callback: 'unarchiveUser' }
  ];

  /**
   * Filter
   *
   * @type {IUserFilter}
   */
  public filter: IUserFilter = {
    pageingInfo: {
      currentPage: 0,
      pageRowCount: 10
    },
    currentFilter: 1,
    currentSortType: 'firstName',
    isAscendantSort: true
  };

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {ToastrService} toastrService - Toastr service
   * @param {UserService} userService - User service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService
  ) {
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
      .getUsers(this.filter)
      .subscribe((users: IUserList) => {
        this.users = users.result;
        this.totalUsers = users.totalRowCount;
      });
  }

  /**
   * Redirect to user edit page
   *
   * @param {string} id - User id
   * @returns {Promise<boolean>}
   */
  public editUser(id: string): Promise<boolean> {
    return this.router.navigate(['/user', id]);
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

  /**
   * On sort changed
   *
   * @param {ICol} col - Table column
   * @returns {void}
   */
  public onSortChanged(col: ICol): void {
    this.filter.isAscendantSort = col.sort;
    this.filter.currentSortType = col.id;

    this.getUsers();
  }

  /**
   * On limit changed
   *
   * @param {number} limit - Rows limit
   * @returns {void}
   */
  public onLimitChanged(limit: number): void {
    this.filter.pageingInfo.currentPage = 0;
    this.filter.pageingInfo.pageRowCount = limit;

    this.getUsers();
  }

  /**
   * On search changed
   *
   * @param {any} query - Search query
   * @returns {void}
   */
  public onSearchChanged(query: any): void {
    this.filter.searchFields = query;
    this.getUsers();
  }

  /**
   * On page changed
   *
   * @param {number} page - Page number
   * @returns {void}
   */
  public onPageChanged(page: number): void {
    this.filter.pageingInfo.currentPage = page - 1;
    this.getUsers();
  }

  /**
   * On type changed
   *
   * @param {number} type - User type
   * @returns {void}
   */
  public onTypeChanged(type: number): void {
    this.filter.currentFilter = type;
    this.getUsers();
  }

  /**
   * On action changed
   *
   * @param {any} action - Action
   * @returns {void}
   */
  public onActionChanged(action: any): void {
    if (this[action.callback]) {
      this[action.callback](action.id);
    }
  }
}