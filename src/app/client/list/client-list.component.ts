import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICol, ITableAction } from '../../shared/table';
import { IClientList, IClientFilter, IActionState } from '../client.interface';
import { Client } from '../client';
import { ClientService } from '../client.service';

/**
 * Client list component
 */
@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  /**
   * Clients
   *
   * @type {Client[]}
   */
  public clients: Client[];

  /**
   * Total clients
   *
   * @type {number}
   */
  public totalClients: number = 0;

  /**
   * Table columns
   *
   * @type {ICol[]}
   */
  public cols: ICol[] = [
    { id: 'name',    title: 'Client Name', format: 'myFirstName', searchable: true },
    { id: 'address', title: 'Address',     format: 'myDefault',   searchable: true },
    { id: 'city',    title: 'City',        format: 'myDefault',   searchable: true },
    { id: 'state',   title: 'State',       format: 'myDefault',   searchable: true },
    { id: 'email',   title: 'Email',       format: 'myDefault',   searchable: true },
    { id: 'phone',   title: 'Phone',       format: 'myDefault',   searchable: true }
  ];

  /**
   * Row actions
   *
   * @type {ITableAction[]}
   */
  public actions: ITableAction[] = [
    { title: 'Edit', callback: 'editClient', acl: 'BasicClientEdit' }
  ];

  /**
   * Filter
   *
   * @type {IClientFilter}
   */
  public filter: IClientFilter = {
    pageingInfo: {
      currentPage: 0,
      pageRowCount: 10
    },
    currentFilter: 1,
    currentSortType: 'name',
    isAscendantSort: true
  };

  /**
   * Constructor
   *
   * @param {Router} router - Router
   * @param {ToastrService} toastrService - Toastr service
   * @param {ClientService} clientService - Client service
   * @returns {void}
   */
  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private clientService: ClientService
  ) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are
   * initialized
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.getClients();
  }

  /**
   * Get clients
   *
   * @returns {void}
   */
  public getClients(): void {
    this.clientService
      .getClients(this.filter)
      .subscribe((clients: IClientList) => {
      this.clients = clients.result;
      this.totalClients = clients.totalRowCount;
    });
  }

  /**
   * Redirect to client edit page
   *
   * @param {string} id - Client id
   * @returns {Promise<boolean>}
   */
  public editClient(id: string): Promise<boolean> {
    return this.router.navigate(['/admin/client', id]);
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

    this.getClients();
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

    this.getClients();
  }

  /**
   * On search changed
   *
   * @param {any} query - Search query
   * @returns {void}
   */
  public onSearchChanged(query: any): void {
    this.filter.searchFields = query;
    this.getClients();
  }

  /**
   * On page changed
   *
   * @param {number} page - Page number
   * @returns {void}
   */
  public onPageChanged(page: number): void {
    this.filter.pageingInfo.currentPage = page - 1;
    this.getClients();
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
