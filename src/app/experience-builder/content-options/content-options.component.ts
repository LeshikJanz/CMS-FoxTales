import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import { ExperienceBuilderService } from '../experience-builder.service';
import { ModalDirective } from 'ngx-bootstrap';
import { ISwitcher } from '../../components/toggles/switcher/switcher.interface';

@Component({
  selector: 'content-options-component',
  templateUrl: './content-options.component.html',
     styleUrls: ['content-options.component.scss']
})

export class ContentOptionsComponent implements OnInit {
  @ViewChild('staticTabs') public staticTabs: TabsetComponent;
  public contentOptionModal: any;
  public contentOptionEditModal: any;
  public contentName: string;
  public contentTypeValue: string;
  public orientationTypeValue: string;
  public contentSwitchOptions: ISwitcher[] = [
    { id: 1, name: 'Still' },
    { id: 2, name: 'GIF' },
    { id: 4, name: 'BurstGIF' }
  ];
  public orientationSwitchOptions: ISwitcher[] = [
   { id: 106, name: 'Landscape' },
   { id: 105, name: 'Portrait' },
   { id: 104, name: 'Square' }
 ];
  public contentOptions: any[];
  public contentTypeOption: any;
  public orientationTypeOption: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private experienceBuilderService: ExperienceBuilderService) {}

 public createTab1() {
  this.experienceBuilderService.addContentOption({
    experienceId:  this.experienceBuilderService.experience.experienceId,
    name: this.contentName,
    captureTypeId: this.contentTypeValue,
    cameraSettings: [
      {
        settingValueId: this.orientationTypeValue,
        ConfigurationOptionId: 53
      }
      ]
    }).subscribe((response) => {
      this.experienceBuilderService.experience.contentOptionId = response.id;

      this.experienceBuilderService.postMediaManipulations({
        mediaManipulationTypeId: 4,
        contentOptionId: this.experienceBuilderService.experience.contentOptionId,
        mediaManipulationTargetId: 1,
        position: 0,
      }).subscribe((response) => { console.log(response); });
    });

  this.staticTabs.tabs[1].active = true;
  }

  public createTab2(modal) {
    // this.experienceBuilderService.updateContentOption({}).subscribe((response) =>{

    // })
    this.experienceBuilderService
    .getContentOptions(this.experienceBuilderService.experience.experienceId)
    .subscribe((response) => {
      this.contentOptions = response.map((content) => {
        console.log(content);
        return content;
      });

      this.contentName = null;
      modal.hide();
      this.staticTabs.tabs[0].active = true;
    });
  }

  public editTab1() {
    console.log('edit tab1');
  };

  public editTab2() {
    console.log('edit tab2');
  };

  public contentOptionEdit(content) {
    this.contentName = content.name;
    if (content.captureTypeId === 1) {
      this.contentTypeOption = this.contentSwitchOptions[0].id;
    }
    if (content.captureTypeId === 2) {
      this.contentTypeOption = this.contentSwitchOptions[1].id;
    }
    if (content.captureTypeId === 4) {
      this.contentTypeOption = this.contentSwitchOptions[2].id;
    }
}

  public onImgUploadedNon64(data) {
    this.experienceBuilderService.postMediaManipulationsAssets(data)
    .subscribe((response) => console.log(response));
  }

  public ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.experienceBuilderService
        .getContentOptions(this.experienceBuilderService.experience.experienceId)
        .subscribe((response) => {
        this.contentOptions = response.map((content) => {
          console.log(content);
          return content;
        });
        });
      }
    });
  }

}
