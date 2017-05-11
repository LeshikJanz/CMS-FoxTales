var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var path = require('path');

module.exports = webpackMerge(commonConfig, {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.playground.ts'
  },
  resolve: {
    alias: {
      sandboxes$: helpers.root('src', 'sandboxes.ts')
    },
    extensions: ['.ts', '.js', '.es6']
  },
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist-playground'),
    publicPath: 'http://localhost:8081/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  module: {

    rules: [

      /*
       * Typescript loader support for .ts
       *
       * Component Template/Style integration using `angular2-template-loader`
       * Angular 2 lazy loading (async routes) via `ng-router-loader`
       *
       * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
       * order of the loader matter.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       * See: https://github.com/TheLarkInn/angular2-template-loader
       * See: https://github.com/shlomiassaf/ng-router-loader
       */
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.webpack.json'
            }
          },
          {
            loader: 'angular2-template-loader'
          }
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        use: 'json-loader'
      },

      /*
       * to string and css loader support for *.css files (from Angular components)
       * Returns file content as string
       *
       */
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        exclude: [helpers.root('src', 'styles')]
      },

      /*
       * to string and sass loader support for *.scss files (from Angular components)
       * Returns compiled css content as string
       *
       */
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
        exclude: [helpers.root('src', 'styles')]
      },

      /* Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },

      /*
       * File loader for supporting images, for example, in CSS files.
       */
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      }]
  },

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
