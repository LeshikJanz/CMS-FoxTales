import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryListComponent } from './list/gallery-list.component';

const GALLERY_ROUTES: Routes = [
  { path: ':id/gallery',    component: GalleryListComponent },
];

export const GALLERY_ROUTING: ModuleWithProviders = RouterModule.forChild(GALLERY_ROUTES);
