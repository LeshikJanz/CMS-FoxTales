import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEventGroup } from '../../../event-groups/list/event-groups.interaface';
import { EventGroupsService } from "../../../event-groups/list/event-groups.service";

@Component({
  selector: 'edit-event-group-header',
  templateUrl: 'edit-eventGroup-header.component.html',
  styleUrls: ['edit-eventGroup-header.component.scss',
    '../../../shared/styles/animations.scss']
})

export class EditEventGroupHeaderComponent {
  constructor(private route: ActivatedRoute,
              private eventGroupService: EventGroupsService) {
  }

  public eventGroup: IEventGroup;

  public ngOnInit() {
    this.route.children[0].params.subscribe((params: any) =>
      this.eventGroupService.getEventGroup(+params['id'])
        .subscribe((eventGroup: IEventGroup) => this.eventGroup = eventGroup)
    );
  }
}
