import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ICol, ITableAction } from '../../shared/table';
import { IUserList, IUserFilter } from '../user.interface';
import { User } from '../user';
import { UserService } from '../user.service';
import { IActionState } from '../../client/client.interface';

/**
 * User list component
 */
@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  /**
   * Archive modal
   *
   * @type {ModalDirective}
   */
  @ViewChild('archiveModal')
  public archiveModal: ModalDirective;

  /**
   * Unarchive modal
   *
   * @type {ModalDirective}
   */
  @ViewChild('unarchiveModal')
  public unarchiveModal: ModalDirective;

  /**
   * Users
   *
   * @type {User[]}
   */
  public users: User[];

  /**
   * Selected user id
   *
   * @type {string}
   */
  public selectedUser: string;

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
    {
      id: 'firstName', title: 'First Name', format: 'myFirstName',
      searchable: true, sort: true
    },
    {id: 'lastName', title: 'Last Name', format: 'default', searchable: true, sort: true},
    {id: 'email', title: 'Email', format: 'default', searchable: true, sort: true},
    {id: 'phone', title: 'Phone', format: 'default', searchable: true, sort: true},
    {id: 'clientName', title: 'Client', format: 'default', searchable: true, sort: true},
    {id: 'location', title: 'Location', format: 'default', searchable: true, sort: true},
    {id: 'lastActiveDate', title: 'Last Active', format: 'default', searchable: true, sort: true}
  ];

  /**
   * Row actions
   *
   * @type {ITableAction[]}
   */
  public actions: ITableAction[] = [
    {title: 'Edit', callback: 'editUser'},
    {title: 'Archive', callback: 'confirmArchive'},
    {title: 'Unarchive', callback: 'confirmUnarchive'}
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
   * Archieve states
   *
   * @type {ITableAction[]}
   */
  public clientStates: IActionState[] = [
    {id: 1, action: 'Unarchived'},
    {id: 2, action: 'Archived'}
  ];

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {ToastrService} toastrService - Toastr service
   * @param {UserService} userService - User service
   * @returns {void}
   */
  constructor(private router: Router,
              private toastrService: ToastrService,
              private userService: UserService) {
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
        console.log('this.users');
        console.log(this.users);
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
    return this.router.navigate(['/admin/user', id]);
  }

  /**
   * Archive user by id
   *
   * @returns {void}
   */
  public archiveUser(): void {
    this.userService
      .archiveUser(this.selectedUser)
      .subscribe(() => {
        this.toastrService.success('User has been archived successfully.');
        this.getUsers();
      });
  }

  /**
   * Unarchive user by id
   *
   * @returns {void}
   */
  public unarchiveUser(): void {
    this.userService
      .unarchiveUser(this.selectedUser)
      .subscribe(() => {
        this.toastrService.success('User has been unarchived successfully.');
        this.getUsers();
      });
  }

  /**
   * Confirm archive user
   *
   * @param {string} id - User id
   * @returns {void}
   */
  public confirmArchive(id: string): void {
    this.selectedUser = id;
    this.archiveModal.show();
  }

  /**
   * Confirm unarchive user
   *
   * @param {string} id - User id
   * @returns {void}
   */
  public confirmUnarchive(id: string): void {
    this.selectedUser = id;
    this.unarchiveModal.show();
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
