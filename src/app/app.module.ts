import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { InlineSVGModule } from 'ng-inline-svg';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { AuthGuard, AuthService, PermissionService } from './shared/core';
import { NoContentComponent } from './no-content';
import { ProfileComponent, ProfileService } from './profile';
import { ForbiddenComponent } from './forbidden';
import { DashboardComponent } from './dashboard';

import './../../node_modules/videogular2/fonts/videogular.css';
import '../styles/styles.scss';

import { FeatureModule } from './components/feature.module';
import { RouteData } from './shared/core/event-management/route-data.service';
import { GalleryModule } from './gallery/gallery.module';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  AuthGuard,
  AuthService,
  PermissionService,
  ProfileService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    ProfileComponent,
    NoContentComponent,
    ForbiddenComponent,
    DashboardComponent
  ],
  imports: [ // import Angular's modules
    BrowserAnimationsModule,
    InlineSVGModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    ToastrModule.forRoot(),
    ToastContainerModule.forRoot(),
    Ng2BootstrapModule,
    DateTimePickerModule,
    SharedModule,
    FeatureModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    RouteData
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }

    // set state
    this.appState._state = store.state;
    // set fox-input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save fox-input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
