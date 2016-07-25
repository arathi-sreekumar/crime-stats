'use strict';

define([
  'jquery',
  'underscore',
  'jqueryui/widgets/autocomplete',
  'backbone',
  'handlebars',
  'models/project',
  'models/geoLocation',
  'models/crime',
  'collections/postcode',
  'views/googleMaps',
  'text!templates/project.html'
], function($, _, autocomplete, Backbone, hbs, ProjectModel, GeoLocationModel, CrimeModel, PostcodeCollection, MapsView, projectsTemplate){

  var ProjectsView = Backbone.View.extend({
    el: $('#page'),

    template: hbs.compile(projectsTemplate),

    events: {
       'click .find' : 'getGeoLocation'
    },

    initAutoComplete: function() {

      var postcodeCollection = new PostcodeCollection();
      this.$('#postcode').autocomplete({
        minLength: 2,
        source: function (request, response) {
          postcodeCollection.searchTerm = request.term;
          postcodeCollection.fetch({
            success: function (collection, data) {
              response(data.result);
            }
          });

        },
        error: function (event, ui) {
          //your error code here
        }
      });
    },

    initialize: function() {

    },

    render: function(){

      this.$el.html(this.template());

      var mapsView = new MapsView();
      mapsView.render();

      this.initAutoComplete();

      // Move this to collections
      

      //get lattitude and longitude from post code
      //api.zippopotam.us/GB/AB1
      //var projectsListView = new ProjectsListView({ collection: projectsCollection}); 
      
      //projectsListView.render(); 

    },

    getGeoLocation: function (e) {
      e.preventDefault();
      var postCode = this.$('#postcode').val().replace(/\s+/, '');
      var geoLocationModel = new GeoLocationModel(postCode);
      geoLocationModel.fetch({
        success: function (model, result) {
          //var crimeModel = new CrimeModel();
          var crimeModel = geoLocationModel.getCrimesModelForLocation();
          crimeModel.fetch({
            success: function (model, data) {
              console.log(model, data, crimeModel.categoryData, crimeModel.during);
            }
          });
        }
      });
    }
  });

  return ProjectsView;
});