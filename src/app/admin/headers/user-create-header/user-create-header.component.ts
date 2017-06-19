import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../client/client.service';
import { IClient } from "../../../client/client.interface";

@Component({
  selector: 'user-create-header',
  templateUrl: 'user-create-header.component.html',
  styleUrls: ['user-create-header.component.scss',
  '../../../shared/styles/animations.scss']
})

export class UserCreateHeaderComponent {
  constructor() {
  }
}