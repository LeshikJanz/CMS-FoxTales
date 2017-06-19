import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../client/client.service';
import { IClient } from "../../../client/client.interface";

@Component({
  selector: 'client-edit-header',
  templateUrl: 'client-edit-header.component.html',
  styleUrls: ['client-edit-header.component.scss']
})

export class ClientEditHeaderComponent {
  constructor(private route: ActivatedRoute,
              private clientService: ClientService) {
  }

  public id: string;

  public client: IClient;

  public ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];
      this.clientService.getClient(this.id)
        .subscribe((client: IClient) =>
          this.client = client
        )
    });
  }
}
