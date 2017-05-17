import { Component, OnChanges, Output, EventEmitter, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: 'add-event-modal',
  templateUrl: 'add-event-modal.component.html',
  styleUrls: ['add-event-modal.component.scss']
})

export class AddEventModalComponent implements OnInit {
  @ViewChild('lgModal') public lgModal: ModalDirective;
  isModalShown: boolean = false;

  /**
   * Group name where events are added
   *
   * type {any}
   * */
  @Input() groupName: any;

  show() {
    this.isModalShown = true;
  }

  hide() {
    this.lgModal.hide();
  }

  onHidden() {
    this.isModalShown = false;
  }

  public ngOnInit() {
    if (this.groupName == null) {
      throw new Error("Attribute 'groupName' is required");
    }
  }
}
