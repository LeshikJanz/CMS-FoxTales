import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { IActionState } from '../../client/client.interface';
import { Router } from '@angular/router';
import { IEvent, IExperience } from '../../event/event.interface';
import { RouteData } from '../../../shared/core/routing/route-data.service';
import { ExperienceBuilderService } from '../../../experience-builder/experience-builder.service';

@Component({
  selector: 'connect-content-option',
  templateUrl: 'connect-content-option.component.html',
  styleUrls: ['connect-content-option.component.scss']
})
export class ConnectContentOptionComponent implements OnChanges {
  /**
   * Experience
   *
   * @type IExperience
   */
  @Input() public experience: any;

  /**
   * Checkbox status
   *
   * @type boolean
   */
  @Input() public checkbox: boolean;

  public contentOption: any;

  /**
   * Save changes
   *
   * @type {EventEmitter}
   */
  @Output() public contentOptionChecked: EventEmitter<any> = new EventEmitter();

  constructor(private _routeData: RouteData,
              private router: Router,
              private experienceService: ExperienceBuilderService) {
  }

  public isChecked(event) {
    this.contentOptionChecked.emit(event);
  }

  public ngOnChanges() {
    this.experienceService.getContentOptions(this.experience.experienceId)
    .subscribe((response) => {
      this.contentOption = response.map((option) => option.name);
    });
  }
}
