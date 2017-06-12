import {
    Component, Input, ViewChild, OnInit,
    OnChanges, Output, EventEmitter
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ITag } from '../../../event/tag.interface';
import { EventService } from '../../../event/event.service';
import { IEventGroup } from '../../../event-groups/list/event-groups.interaface';
import { IEvent } from '../../../event/event.interface';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'event-delete-modal',
    templateUrl: 'event-delete-modal.component.html',
    styleUrls: ['event-delete-modal.component.scss']
})

export class EventDeleteModalComponent implements OnChanges {

    @ViewChild('deleteModal') public lgModal: ModalDirective;
    public isModalShown: boolean = false;

    /**
     * Event
     *
     * type {IEvent}
     */
    public event: IEvent;

    /**
     * Tags
     *
     * @type {ITag[]}
     */
    public tags: ITag[];

    /**
     * Save changes
     *
     * @type {EventEmitter}
     */
    @Output() public save: EventEmitter<any> = new EventEmitter();

    @Output() public delete: EventEmitter<any> = new EventEmitter();

    /**
     * Constructor
     *
     * @param {EventService} eventService - event service
     * @param {ToastrService} toastrService - toastr service
     * @return {void}
     */
    constructor(private eventService: EventService,
                private toastrService: ToastrService) {
    }

    public deleteEvent(){
        this.eventService.deleteEvent(this.event).
        subscribe((event) => {
            this.delete.emit();
            this.hide();
        })
  
      
    }
    /**
     * Show modal
     *
     * @return {void}
     */
    public show(event: IEvent) {
        this.event = event;
        this.isModalShown = true;
    }


    /**
     * Hide modal
     *
     * @return {void}
     */
    public hide() {
        this.lgModal.hide();
    }

    /**
     * On close modal
     *
     * @return {void}
     */
    public onHidden() {
        this.isModalShown = false;
    }

    /**
     * Lifecycle hook that is called after ngOnInit and after any component's
     * properties change
     *
     * @returns {void}
     */
    public ngOnChanges() {
      
    }


}
