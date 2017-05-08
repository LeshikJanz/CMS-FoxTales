import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    currentSortType: 1,
    isAscendantSort: true
  };

  /**
   * Total clients
   *
   * @type {number}
   */
  public totalClients: number = 0;

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
}
