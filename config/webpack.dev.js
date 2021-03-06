const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL = 'http://dev.getfoxtales.com/api';
const AD_TENANT = process.env.AD_TENANT = 'common';
const AD_CLIENT = process.env.AD_CLIENT = '018ba0b5-782f-405b-82c3-871178e219ad';
const FACEBOOK_ID = process.env.FACEBOOK_ID = '138371986719204';
const TWITTER_ID = process.env.TWITTER_ID = 'dYwfwIRNmhhcleI0lWYJyby8v';
const TUMBLR_ID = process.env.TUMBLR_ID = 'USVEg5yTqC536m3d32J60rpR1XovZ3cBE2Vl1EGa3Uwwk1F1WY';
const AUTH_PROXY = process.env.AUTH_PROXY = 'https://auth-server.herokuapp.com/proxy';
const GOOGLE_KEY = process.env.GOOGLE_KEY = 'AIzaSyAW7s_PMAH6CJRMMXRVWnQPevWqipMkCyA';
const BING_KEY = process.env.BING_KEY = 'AgPn8P9gDiOFuiw33ebWeLKdx29J1Z-dNh3PqN03rsgLvu4bTQZwiDvQuwxFhqcZ';
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  API_URL: API_URL,
  AD_TENANT: AD_TENANT,
  AD_CLIENT: AD_CLIENT,
  FACEBOOK_ID: FACEBOOK_ID,
  TWITTER_ID: TWITTER_ID,
  TUMBLR_ID: TUMBLR_ID,
  AUTH_PROXY: AUTH_PROXY,
  GOOGLE_KEY: GOOGLE_KEY,
  BING_KEY: BING_KEY,
  ENV: ENV,
  HMR: HMR
});


const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'cheap-module-source-map',

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {

      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: helpers.root('dist'),

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */
      filename: '[name].bundle.js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
      sourceMapFilename: '[file].map',

      /** The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[id].chunk.js',

      library: 'ac_[name]',
      libraryTarget: 'var',
    },

    module: {

      rules: [
       {
         test: /\.ts$/,
         use: [
           {
             loader: 'tslint-loader',
             options: {
               configFile: 'tslint.json'
             }
           }
         ],
         exclude: [/\.(spec|e2e)\.ts$/]
       },

        /*
         * css loader support for *.css files (styles directory only)
         * Loads external css styles into the DOM, supports HMR
         *
         */
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: [helpers.root('src', 'styles')]
        },

        /*
         * sass loader support for *.scss files (styles directory only)
         * Loads external sass styles into the DOM, supports HMR
         *
         */
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: [helpers.root('src', 'styles')]
        },
        {
          test: /\.(eot|woff2?|svg|ttf|otf)([\?]?.*)$/,
          use: 'file-loader'
        }

      ]

    },

    plugins: [

      /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'API_URL': JSON.stringify(METADATA.API_URL),
        'AD_TENANT': JSON.stringify(METADATA.AD_TENANT),
        'AD_CLIENT': JSON.stringify(METADATA.AD_CLIENT),
        'FACEBOOK_ID': JSON.stringify(METADATA.FACEBOOK_ID),
        'TWITTER_ID': JSON.stringify(METADATA.TWITTER_ID),
        'TUMBLR_ID': JSON.stringify(METADATA.TUMBLR_ID),
        'AUTH_PROXY': JSON.stringify(METADATA.AUTH_PROXY),
        'GOOGLE_KEY': JSON.stringify(METADATA.GOOGLE_KEY),
        'BING_KEY': JSON.stringify(METADATA.BING_KEY),
        'HMR': METADATA.HMR,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'API_URL' : JSON.stringify(METADATA.API_URL),
          'AD_TENANT': JSON.stringify(METADATA.AD_TENANT),
          'AD_CLIENT': JSON.stringify(METADATA.AD_CLIENT),
          'FACEBOOK_ID': JSON.stringify(METADATA.FACEBOOK_ID),
          'TWITTER_ID': JSON.stringify(METADATA.TWITTER_ID),
          'TUMBLR_ID': JSON.stringify(METADATA.TUMBLR_ID),
          'AUTH_PROXY': JSON.stringify(METADATA.AUTH_PROXY),
          'GOOGLE_KEY': JSON.stringify(METADATA.GOOGLE_KEY),
          'BING_KEY': JSON.stringify(METADATA.BING_KEY),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR,
        }
      }),

      new DllBundlesPlugin({
        bundles: {
          polyfills: [
            'core-js',
            {
              name: 'zone.js',
              path: 'zone.js/dist/zone.js'
            },
            {
              name: 'zone.js',
              path: 'zone.js/dist/long-stack-trace-zone.js'
            },
          ],
          vendor: [
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/core',
            '@angular/common',
            '@angular/forms',
            '@angular/http',
            '@angular/router',
            '@angularclass/hmr',
            'rxjs',
            '@agm/core',
            '@ultimate/ngxerrors',
            'ng2-validation',
            'ngx-toastr',
            'ng2-tag-input',
            'hellojs'
          ]
        },
        dllDir: helpers.root('dll'),
        webpackConfig: webpackMergeDll(commonConfig({env: ENV}), {
          devtool: 'cheap-module-source-map',
          plugins: []
        })
      }),

      /**
       * Plugin: AddAssetHtmlPlugin
       * Description: Adds the given JS or CSS file to the files
       * Webpack knows about, and put it into the list of assets
       * html-webpack-plugin injects into the generated html.
       *
       * See: https://github.com/SimenB/add-asset-html-webpack-plugin
       */
      new AddAssetHtmlPlugin([
        { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
        { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
      ]),

      /**
       * Plugin: NamedModulesPlugin (experimental)
       * Description: Uses file names as module name.
       *
       * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
       */
      // new NamedModulesPlugin(),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        debug: true,
        options: {

        }
      }),

    ],

    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  });
}
