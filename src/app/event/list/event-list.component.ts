import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { IActionState } from '../../client/client.interface';
import { EventGroupsService } from '../../event-groups/list/event-groups.service';
import { IEventFilter } from '../event.interface';
import { ITableAction } from '../../shared/table/action.interface';

/**
 * Event list component
 */
@Component({
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
    /**
     * Event
     *
     * @type {Event[]}
     */
    public Events: any[];

    /**
     * Event
     *
     * @type {Event[]}
     */
    public eventGroups: any[];

    /**
     *  Event actions
     *
     * @type {IActionState[]}
     */
    public eventActions: IActionState[] = [
        { id: 1, action: 'SETTINGS', callback: 'onSettingChange' },
        { id: 2, action: 'CLONE', callback: 'onClone' },
        { id: 3, action: 'ARCHIEVE', callback: 'onArchieve' },
        { id: 4, action: 'ADD TO GROUP', callback: 'onAddToGroup' },
        { id: 5, action: 'ASSIGN USERS', callback: 'onAssignUsers' }
    ];

    /**
     * Initial sort object
     *
     * @type {IEventFilter}
     */
    public initialSorting: IEventFilter = {
        sortBy: 'StartTime',
        sortAscending: true
    };

    /**
     * Sort actions
     *
     * @type {IActionState[]}
     */
    public sortActions: IActionState[] = [
        { id: 1, action: 'Upcoming', callback: 'onUpcomingSort' },
        { id: 2, action: 'Descending', callback: 'onDescendingSort' },
        { id: 3, action: 'Start date', callback: 'onStartDateSort' },
        { id: 4, action: 'End date', callback: 'onEndDateSort' },
    ];

    constructor(private eventService: EventService,
                private eventGroupsService: EventGroupsService) {
    }

    public ngOnInit(): void {
        this.getEvents();
        this.getEventGroups();
    }

    /**
     * On upcoming sorting
     *
     * @returns {void}
     */
    public onUpcomingSort() {
        const filter = { sortBy: 'Name', sortAscending: true };
        this.getEvents(filter);
    }

    /**
     * On descending sorting
     *
     * @returns {void}
     */
    public onDescendingSort() {
        const filter = { sortBy: 'Name', sortAscending: false };
        this.getEvents(filter);
    }

    /**
     * On start date sorting
     *
     * @returns {void}
     */
    public onStartDateSort() {
        this.getEvents(this.initialSorting);
    }

    /**
     * On end date sorting
     *
     * @returns {void}
     */
    public onEndDateSort() {
        const filter = { sortBy: 'EndTime', sortAscending: true };
        this.getEvents(filter);
    }

    /**
     * Handle Sorting
     *
     * @param {IActionState}
     * @return {void}
     */
    public onSortChanged(action: IActionState): void {
        if (this[action.callback]) {
            this[action.callback](action.id);
        }
    }

    /**
     * On action changed
     *
     * @param {any} action - Action
     * @returns {void}
     */
    public onActionChanged(action: any): void {
        console.log('onActionChanged');
    }

    /**
     * Get events
     *
     * @returns {void}
     */
    public getEvents(filter: IEventFilter = this.initialSorting): void {
        this.eventService
            .getEvents(filter)
            .subscribe((events) => {
                this.Events = events;
            });
    }

    /**
     * Get event groups
     *
     * @returns {void}
     */
    public getEventGroups(): void {
        this.eventGroupsService
            .getEventGroups()
            .subscribe((eventGroups) => {
                this.eventGroups = eventGroups;
            });
    }
}
