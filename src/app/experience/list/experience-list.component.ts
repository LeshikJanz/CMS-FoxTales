import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../experience.service';
import { ActivatedRoute } from '@angular/router';
import { ITableAction } from '../../shared/table/action.interface';

/**
 * Experience list component
 */
@Component({
  selector: 'experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.scss']
})
export class ExperienceListComponent implements OnInit {
   /**
    * Experience
    *
    * @type {Experience[]}
    */
    public Experience: any[];

   /**
    * getting query parameter to find specific experiences
    *
    */
    public id: number;

    public status: any;

    private sub: any;

    constructor(
      private experienceService: ExperienceService,
      private route: ActivatedRoute) {
    }


  /**
   *  Experience actions
   *
   * @type {ITableAction[]}
   */
  public experienceActions: ITableAction[] = [
    { id: 1, title: 'EDIT', callback: 'onEdit' },
    { id: 2, title: 'CLONE', callback: 'onClone' },
    { id: 3, title: 'ARCHIEVE', callback: 'onArchieve' },
    { id: 4, title: 'ADD TO GROUP', callback: 'onAddToGroup' },
    { id: 5, title: 'ASSIGN USERS', callback: 'onAssignUsers' },
    {id: 6, title: 'RECAP REPORT', callback: 'onRecapReport'},
    {id: 7, title: 'EXPORT CRM DATA', callback: 'onExportCrmData'}
  ];

  /**
   * Search handler
   *
   * @param {string} value
   * @returns {void}
   */
  public onSearchChange(value: string): void {
    console.log('onSearchChange');
  }

    public ngOnInit(): void {
      this.sub = this.route.params.subscribe((params) => {
        this.id = params['id'];
      });
      console.log('this.id');
      console.log(this.id);

      this.getExperiences();
    }

   /**
    * Get experiences
    *
    * @returns {void}
    */
    public getExperiences(): void {
        this.experienceService
        .getExperiences(this.id)
        .subscribe((experiences) => {
          this.Experience = experiences;
    });
  }
}
