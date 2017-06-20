import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../client/client.service';
import { IClient } from '../../../client/client.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'client-edit-header',
  templateUrl: 'client-edit-header.component.html',
  styleUrls: ['client-edit-header.component.scss',
              '../../../shared/styles/animations.scss']
})

export class ClientEditHeaderComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private clientService: ClientService) {}

  public client: IClient;

  public ngOnInit() {
    this.route.children[0].params.subscribe((params: any) =>
        this.clientService.getClient(params['id'])
          .subscribe((client: IClient) => this.client = client)
      );
    }
}
