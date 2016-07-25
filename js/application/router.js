// Filename: router.js
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'views/project'
  //'views/contributors/ContributorsView',
  //'views/footer/FooterView'
], function($, _, Backbone, ProjectsView) {
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
        projectsView.render();

    });

    app_router.on('route:defaultAction', function (actions) {
        var projectsView = new ProjectsView();
        projectsView.render();
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});