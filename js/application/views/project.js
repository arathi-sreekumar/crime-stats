'use strict';

define([
  'jquery',
  'underscore',
  'jqueryui/widgets/autocomplete',
  'backbone',
  'handlebars',
  'models/geoLocation',
  'models/crime',
  'collections/postcode',
  'views/googleMaps',
  'views/crime',
  'text!templates/project.html'
], function($, _, autocomplete, Backbone, hbs, GeoLocationModel, CrimeModel, PostcodeCollection, MapsView, CrimeView, projectsTemplate){

  var ProjectsView = Backbone.View.extend({
    el: $('#page'),

    template: hbs.compile(projectsTemplate),

    events: {
       'click .find' : 'displayCrimeDataAndMap'
    },

    /*
     * initAutoComplete method  initializes the autocomplete method
     * It is used to connect the postcode collection to the autocomplete input 
     * to provide the autocomplete list when user types into the postcode input field
    */
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
      this.geoLocationModel = new GeoLocationModel();
    },

    render: function(){

      this.$el.html(this.template());

      this.mapsView = new MapsView();

      this.crimeView = new CrimeView();

      this.initAutoComplete();

    },

    /*
     * show map function renders the map
     * @param postCode  the postcode to display the map for
    */
    showMap: function (postCode) {
      this.mapsView.render(postCode);
    },

    /*
     * getGeoLocation gets the lattitude and longitude for given postcode by calling the geolocation model
     * and returns a crime model with the latitude and longitude set, 
     * which is then passed to the crime view to fetch and render
     * @param postCode  postcode for which crime data needs to be retreived
    */
    getGeoLocationAndShowCrimeStats: function (postCode) {
      var that = this;
      this.geoLocationModel.setPostCode(postCode);
      this.geoLocationModel.fetch({
        success: function (model, result) {
          //var crimeModel = new CrimeModel();
          var crimeModel = that.geoLocationModel.getCrimesModelForLocation();
          that.crimeView.updateModel(crimeModel);
        }
      });
    },

    /*
     * Display crime data and map for given postcode
     * e event object  clicked event object 
    */
    displayCrimeDataAndMap: function(e) {
      e.preventDefault();
      var postCode = this.$('#postcode').val().replace(/\s+/, '');
      this.showMap(postCode);
      this.getGeoLocationAndShowCrimeStats(postCode);
    }
  });

  return ProjectsView;
});