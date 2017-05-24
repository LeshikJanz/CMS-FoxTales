import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExperienceBuilderIntroComponent } from './experience-builder-intro';
import { ExperienceBuilderContainerComponent } from './experience-builder-container';
import { BasicDetailsComponent } from './basic-details';
import { UIBuilderComponent } from './ui-builder';
import { EmailBuilderComponent } from './email-builder';
import { ContentOptionsComponent } from './content-options';
import { SharingOptionsComponent } from './sharing-options';
import { ContentGalleryComponent } from './content-gallery';
import { ContentFeedsComponent } from './content-feeds';

const EXPERIENCE_BUILDER_ROUTES: Routes = [
  { path: '',    redirectTo: 'intro' },
  { path: 'intro',    component: ExperienceBuilderIntroComponent },
  { path: 'container',component: ExperienceBuilderContainerComponent,
    children: [
        { path: 'basic-details', component: BasicDetailsComponent },
        { path: 'ui-builder', component: UIBuilderComponent },
        { path: 'email-builder', component: EmailBuilderComponent },
        { path: 'content-options', component: ContentOptionsComponent },
        { path: 'sharing-options', component: SharingOptionsComponent },
        { path: 'content-gallery', component: ContentGalleryComponent },
        { path: 'content-feeds', component: ContentFeedsComponent }
    ] }
];

export const EXPERIENCE_BUILDER_ROUTING: ModuleWithProviders = 
    RouterModule.forChild(EXPERIENCE_BUILDER_ROUTES);
