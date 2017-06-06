/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { bootloader } from '@angularclass/hmr';
import hello from 'hellojs';

/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';

window['hello'] = hello;
require('hellojs/src/modules/tumblr.js');

/**
 * Init hello.js
 */
hello.init({
  facebook: process.env.FACEBOOK_ID,
  twitter: process.env.TWITTER_ID,
  tumblr: process.env.TUMBLR_ID
}, {
  oauth_proxy: process.env.AUTH_PROXY,
  redirect_uri: '/#/redirect'
});

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch((err) => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
