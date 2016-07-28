// Filename: router.js
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'views/project',
  'views/home'
  //'views/contributors/ContributorsView',
  //'views/footer/FooterView'
], function($, _, Backbone, ProjectsView, HomeView) {
  //, ContributorsView, FooterView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'crimes': 'showCrimeStats',
      
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter();
    
    app_router.on('route:showCrimeStats', function(){
        var projectsView = new ProjectsView();
    });

    app_router.on('route:defaultAction', function (actions) {
        var homeView = new HomeView();
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});