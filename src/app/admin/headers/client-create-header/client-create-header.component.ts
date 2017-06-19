import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../client/client.service';
import { IClient } from "../../../client/client.interface";

@Component({
  selector: 'client-create-header',
  templateUrl: 'client-create-header.component.html',
  styleUrls: ['client-create-header.component.scss',
  '../../../shared/styles/animations.scss']
})

export class ClientCreateHeaderComponent {
  constructor() {
  }
}
