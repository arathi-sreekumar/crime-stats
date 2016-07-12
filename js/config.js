// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  deps: ["main"],
  paths: {
    jquery: 'libs/jquery-3.0.0.min',
    underscore: 'libs/underscore.min',
    backbone: 'libs/backbone.min',
    handlebars: 'libs/handlebars.min',
    text : 'libs/text',
    router: 'application/router',
    templates: '../templates',
    views: 'application/views',
    models: 'application/models',
    collections: 'application/collections'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    }
  }
});