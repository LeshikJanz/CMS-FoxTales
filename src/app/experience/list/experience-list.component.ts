import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../experience.service';
import { ActivatedRoute } from '@angular/router';
import { ITableAction } from '../../shared/table/action.interface';
import { IActionState } from '../../client/client.interface';

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

  /**
   *  Experience actions
   *
   * @type {ITableAction[]}
   */
  public experienceActions: ITableAction[] = [
    { id: 1, title: 'EDIT', callback: 'onEdit', acl: 'CreateEditExperiences' },
    { id: 2, title: 'CLONE', callback: 'onClone', acl: 'CloneExperience' },
    { id: 3, title: 'DELETE', callback: 'onDelete', acl: 'DeleteExperiences' },
    { id: 4, title: 'ADD TO GROUP', callback: 'onAddToGroup' },
    { id: 5, title: 'ASSIGN USERS', callback: 'onAssignUsers' },
    { id: 6, title: 'RECAP REPORT', callback: 'onRecapReport' },
    { id: 7, title: 'EXPORT CRM DATA', callback: 'onExportCrmData' }
  ];

  /**
   * Sort actions
   *
   * @type {IActionState[]}
   */
  public sortActions: IActionState[] = [
    { id: 1, action: 'Upcoming' },
    { id: 2, action: 'Descending' }
  ];

  private sub: any;

  constructor(private experienceService: ExperienceService,
              private route: ActivatedRoute) {
  }

  /**
   * Search handler
   *
   * @param {string} value
   * @returns {void}
   */
  public onSearchChange(value: string): void {
    console.log('onSearchChange');
  }

  /**
   * Sort handler
   *
   * @param {string} value
   * @returns {void}
   */
  public onSortChanged(value: string): void {
    console.log('onSortChanged');
  }

  public ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

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

  public onDeleteExperience() {
    this.getExperiences();
  }
}
