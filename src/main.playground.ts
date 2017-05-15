import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { PlaygroundModule, initializePlayground } from 'angular-playground';

if (process.env.ENV === 'production') {
  enableProdMode();
}

initializePlayground('app');
platformBrowserDynamic().bootstrapModule(PlaygroundModule);
