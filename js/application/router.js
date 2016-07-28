// Filename: router.js
'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'models/geoLocation',
  'models/postcode',
  'collections/postcode',
  'views/project',
  'views/home'
  //'views/contributors/ContributorsView',
  //'views/footer/FooterView'
], function($, _, Backbone, GeoLocationModel, PostCodeModel, PostcodeCollection, ProjectsView, HomeView) {
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
      var geoLocationModel = new GeoLocationModel();
      var postcodeCollection = new PostcodeCollection();
      var postCodeModel = new PostCodeModel();
      var projectsView = new ProjectsView(geoLocationModel, postCodeModel, postcodeCollection);
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