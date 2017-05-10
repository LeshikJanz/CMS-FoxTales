import { UploadButton } from "./uploadButton/upload-button.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FEATURE_ROUTES } from "./feature.routing";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CreationButton } from "./creationButton/creation-button.component";
import { DropDownSelect } from "./dropdown-select/dropdown-select.component";
import { Navigation } from "./navigation/navigation.component";

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
    DropDownSelect,
    Navigation
  ],
  exports: [
    CreationButton,
    UploadButton,
    DropDownSelect,
    CommonModule,
    FormsModule,
    Navigation
  ]
})

export class FeatureModule {
}
