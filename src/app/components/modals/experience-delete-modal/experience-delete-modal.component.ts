import {
    Component, Input, ViewChild, OnInit,
    OnChanges, Output, EventEmitter
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ITag } from '../../../event/tag.interface';
import { ExperienceService } from '../../../experience/experience.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'experience-delete-modal',
    templateUrl: 'experience-delete-modal.component.html',
    styleUrls: ['experience-delete-modal.component.scss']
})

export class ExperienceDeleteModalComponent implements OnChanges {

    @ViewChild('deleteModal') public lgModal: ModalDirective;
    public isModalShown: boolean = false;

    /**
     * Event
     *
     * type {IExperience}
     */
    public experience: any[];

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
    constructor(private experienceService: ExperienceService,
                private toastrService: ToastrService) {
    }

    public deleteExperience(){
        this.experienceService.deleteExperience(this.experience).
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
    public show(experience) {
        this.experience = experience;
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
