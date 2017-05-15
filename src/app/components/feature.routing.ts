import { Routes } from '@angular/router';
import { MainNavigationComponent } from './navigations/main-navigation/main-navigation.component';

export const FEATURE_ROUTES: Routes = [
  { path: 'feature/:main-navigation',    component: MainNavigationComponent },

];
