'use strict';

define([
  'jquery',
  'underscore',
  'jqueryui/widgets/autocomplete',
  'backbone',
  'handlebars',
  'models/geoLocation',
  'models/crime',
  'models/postcode',
  'collections/postcode',
  'views/crime',
  'text!templates/project.html'
], function($, _, autocomplete, Backbone, hbs, GeoLocationModel, CrimeModel, PostCodeModel, PostcodeCollection, CrimeView, projectsTemplate){

  var ProjectsView = Backbone.View.extend({
    el: $('#page'),

    template: hbs.compile(projectsTemplate),

    events: {
       'click .find' : 'validateAndDisplayCrimeDataAndMap'
    },

    /*
     * initAutoComplete method  initializes the autocomplete method
     * It is used to connect the postcode collection to the autocomplete input 
     * to provide the autocomplete list when user types into the postcode input field
    */
    initAutoComplete: function() {

      var that = this;
      this.$('#postcode').autocomplete({
        minLength: 2,
        source: function (request, response) {
          that.postcodeCollection.searchTerm = request.term;
          that.postcodeCollection.fetch({
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

      this.postcodeCollection = new PostcodeCollection();

      this.postCodeModel = new PostCodeModel();

      this.render();
      
    },

    render: function(data){
      data = data || {};
      this.$el.html(this.template(data));
      this.initAutoComplete();
      this.crimeView = new CrimeView();
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
          setTimeout(function () {
            that.crimeView.updateModel(crimeModel);
          }, 400);
        }
      });
    },

    /*
     * Display crime data and map for given postcode if valid postcode
     * e event object  clicked event object 
    */
    validateAndDisplayCrimeDataAndMap: function(e) {
      e.preventDefault();
      //to do validate postcode
      var that = this;
      var postCode = this.$('#postcode').val().replace(/\s+/, '');
      if (postCode.length) {
        $('.data-container .loading-container').removeClass('hidden');
        this.postCodeModel.setPostCode(postCode);
        this.postCodeModel.fetch({
          success: function (model, response) {
            if (response.result) {
              $('.error').addClass('hide');
              that.getGeoLocationAndShowCrimeStats(postCode);
            } else {
              $('.error').removeClass('hide');
            }
          }
        });
      }
    }
  });

  return ProjectsView;
});