import { Component, Input, OnChanges } from '@angular/core';
import { IActionState } from '../../client/client.interface';
import { Router } from '@angular/router';
import { IEvent, IExperience } from '../../event/event.interface';

@Component({
  selector: 'experience',
  templateUrl: 'experience.component.html',
  styleUrls: ['experience.component.scss']
})

export class ExperienceComponent implements OnChanges {

  /**
   * Experience
   *
   * @type IExperience
   */
  @Input() public experience: IExperience;

  /**
   * Actions for experience
   *
   * @type IActionState[]
   */
  @Input() public experienceActions: IActionState[];

  /**
   * Object controls Modal state
   *
   * @type {any}
   */
  @Input() public modal: any;

  /**
   * Event name
   *
   * @type string
   */
  @Input() public name: string;

  /**
   * Checkbox status
   *
   * @type boolean
   */
  @Input() public checkbox: boolean;

  /**
   * Event date
   *
   * @type Date
   */
  @Input() public date: Date;

  /**
   * Event tags
   *
   * @type [string]
   */
  @Input() public tags: string[] = null;

  /**
   * Event tags
   *
   * @type number
   */
  @Input() public expCount: number = null;

  /**
   * Event status
   *
   * @type number
   * 0 - default, - 1 - fail, 1 - completed
   */
  @Input() public status: number = 0;

  /**
   * is event checked?
   *
   * @type boolean
   */
  public isChecked: boolean = false;

  constructor(private router: Router) {}

  /**
   * On event action changed
   *
   * @param {IEvent} event - event
   * @param {IActionState} action - event action
   * @return {void}
   */
  public onActionChanged(experience: IExperience, action: IActionState) {
    if (this[action.callback]) {
      this[action.callback](experience);
    }
  }

  public ngOnChanges() {
    console.log('this.experience');
    console.log(this.experience);
  }
}
