import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryItemListComponent } from '../../gallery-items/list/gallery-item-list.component';
import { GalleryListComponent } from '../list/gallery-list.component';

const GALLERY_ROUTES: Routes = [
  { path: '',  pathMatch: 'full',    component: GalleryItemListComponent },
  { path: ':id', pathMatch: 'full',    component: GalleryItemListComponent },
];

export const GALLERY_ROUTING: ModuleWithProviders = RouterModule.forChild(GALLERY_ROUTES);
