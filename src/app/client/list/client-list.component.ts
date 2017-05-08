import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICol } from '../../shared/table';
import { IClient, IClientList, IClientFilter } from '../client.interface';
import { Client } from '../client';
import { ClientService } from '../client.service';

/**
 * Client list component
 */
@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html'
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
    { id: 'name',    title: 'Client Name', format: 'default' },
    { id: 'address', title: 'Address',     format: 'default' },
    { id: 'city',    title: 'City',        format: 'default' },
    { id: 'state',   title: 'State',       format: 'default' },
    { id: 'email',   title: 'Email',       format: 'default' },
    { id: 'phone',   title: 'Phone',       format: 'default' }
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
   * @param {ToastrService} toastrService - Toastr service
   * @param {ClientService} clientService - Client service
   * @returns {void}
   */
  constructor(private toastrService: ToastrService, private clientService: ClientService) {
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
   * Archive client by id
   *
   * @param {string} id - Client id
   * @returns {void}
   */
  public archiveClient(id: string): void {
    this.clientService
      .archiveClient(id)
      .subscribe(() => {
        this.toastrService.success('Client has been archived successfully.');
        this.getClients();
      });
  }

  /**
   * Unarchive client by id
   *
   * @param {string} id - Client id
   * @returns {void}
   */
  public unarchiveClient(id: string): void {
    this.clientService
      .unarchiveClient(id)
      .subscribe(() => {
        this.toastrService.success('Client has been unarchived successfully.');
        this.getClients();
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
   * On type changed
   *
   * @param {number} type - Client type
   * @returns {void}
   */
  public onTypeChanged(type: number): void {
    this.filter.currentFilter = type;
    this.getClients();
  }
}
