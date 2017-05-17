import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExperienceBuilderIntroComponent } from './experience-builder-intro';
import { ExperienceBuilderContainerComponent } from './experience-builder-container';
import { BasicDetailsComponent } from './basic-details';
import { UIBuilderComponent } from './ui-builder';
import { EmailBuilderComponent } from './email-builder';


const EXPERIENCE_BUILDER_ROUTES: Routes = [
  { path: '',    redirectTo: 'intro' },
  { path: 'intro',    component: ExperienceBuilderIntroComponent },
  { path: 'container',component: ExperienceBuilderContainerComponent,
    children: [
        { path: 'basic-details', component: BasicDetailsComponent },
        { path: 'ui-builder', component: UIBuilderComponent },
        { path: 'email-builder', component: EmailBuilderComponent },
    ] }
];

export const EXPERIENCE_BUILDER_ROUTING: ModuleWithProviders = RouterModule.forChild(EXPERIENCE_BUILDER_ROUTES);
