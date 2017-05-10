import { UploadButton } from "./uploadButton/upload-button.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FEATURE_ROUTES } from "./feature.routing";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CreationButton } from "./creationButton/creation-button.component";
import { DropDownSelect } from "./dropdown-select/dropdown-select.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(FEATURE_ROUTES),
  ],
  providers: [],
  declarations: [
    CreationButton,
    UploadButton,
    DropDownSelect
  ],
  exports: [
    CreationButton,
    UploadButton,
    DropDownSelect,
    CommonModule,
    FormsModule
  ]
})

export class FeatureModule {
}
